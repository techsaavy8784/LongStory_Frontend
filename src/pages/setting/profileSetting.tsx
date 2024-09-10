import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import useAuth from "@/hooks/useAuth";
import InputField2 from "@/components/InputField2";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UpdatedUserProfile } from "@/types/auth";
import { PrivacyBar } from "@/components/settings/billing/privacyBar";

const ProfileSetting = () => {
  const [file, setFile] = useState<File | null>();
  const [profileChanged, setProfileChanged] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { user, updateProfile } = useAuth();

  const onChangeAvatar = () => {
    fileRef.current?.click();
  };

  const onInputChange = () => {
    setProfileChanged(true);
  };

  const schema = yup
    .object({
      email: yup
        .string()
        .required("* Please input your Email")
        .email("Invalid Email"),
      first_name: yup.string(),
      last_name: yup.string(),
      country: yup.string(),
      birthday: yup.string(),
      phone: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
      phone: user?.phone,
      country: user?.country,
      birthday: user?.birthday ? user?.birthday.slice(0, 10) : undefined,
    },
  });

  const onSubmit = async (updatedUserProfile: {
    email: string | undefined;
    first_name?: string | undefined;
    country?: string | undefined;
    birthday?: string | undefined;
    phone?: string | undefined;
    last_name?: string | undefined;
  }) => {
    const data: UpdatedUserProfile = file
      ? { file, ...updatedUserProfile }
      : updatedUserProfile;

    try {
      await updateProfile(data);
      setProfileChanged(false);
      setFile(null);
    } catch (err: any) {
      console.log(err);
      if (err && err?.email) {
        setError("email", {
          type: "manual",
          message: err?.email,
        });
      }
    }
  };
  return (
    <div>
      <div className="px-8 py-5 text-2xl font-bold">Profile Setting</div>

      <div className="p-16 space-y-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user?.avatar_url
                  ? user?.avatar_url
                  : `/assets/images/users/User.svg`
              }
              alt="avatar"
              className="w-[100px] h-[100px] rounded-full"
            />
            <button
              className="absolute w-full h-full rounded-full opacity-0 bg-black top-0 bottom-0 flex flex-col  justify-center items-center  z-10   hover:opacity-100 hover:bg-opacity-50 hover:cursor-pointer gap-"
              onClick={onChangeAvatar}
            >
              <img
                src={`/assets/images/Camera_4.png`}
                alt="avatar"
                className="w-[22.86px] h-[22.86px] opacity-100"
              />
              <p className="text-white text-[8.57px] leading-[12.86px] font-bold opacity-100">
                Change Picture
              </p>
            </button>
            <input
              type="file"
              className="hidden"
              name="files"
              ref={fileRef}
              onChange={(e) => {
                setProfileChanged(true);
                setFile(e.target.files?.[0]);
              }}
            />
          </div>
          <div className="text-xl font-semibold">{user?.username}</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-6">
            <div className="flex gap-8 justify-between items-start">
              <InputField2
                label="First Name"
                img="name"
                name="first_name"
                placeholder="Joe"
                onInputChange={onInputChange}
                formMethods={{ control, register }}
              >
                {errors.first_name?.message && (
                  <p className="text-red">{errors.first_name?.message}</p>
                )}
              </InputField2>
              <InputField2
                label="Last Name"
                img="name"
                name="last_name"
                placeholder="Einhorn"
                onInputChange={onInputChange}
                formMethods={{ control, register }}
                // value={user?.last_name}
              >
                {errors.last_name?.message && (
                  <p className="text-red">{errors.first_name?.message}</p>
                )}
              </InputField2>
            </div>
            <div className="flex gap-8 justify-between">
              <InputField2
                label="Email"
                img="email"
                name="email"
                placeholder="joeeinhorn@kent@email.com"
                onInputChange={onInputChange}
                formMethods={{ control, register }}
                // value={user?.email}
              >
                {errors.email?.message && (
                  <p className="text-red">{errors.email?.message}</p>
                )}
              </InputField2>
              <InputField2
                label="Country"
                img="email"
                name="country"
                placeholder="USA"
                onInputChange={onInputChange}
                formMethods={{ control, register }}
                // value={user?.country}
              >
                {errors.country?.message && (
                  <p className="text-red">{errors.country?.message}</p>
                )}
              </InputField2>
            </div>
            <div className="flex gap-8 justify-between">
              <InputField2
                label="Date of Birth"
                img="date"
                name="birthday"
                placeholder="08/09/1989"
                type="date"
                onInputChange={onInputChange}
                formMethods={{ control, register }}
                // value={user?.birthday?.toDateString()}
              ></InputField2>
              <InputField2
                label="Phone Number"
                img="phone"
                name="phone"
                placeholder="1234567890"
                onInputChange={onInputChange}
                formMethods={{ control, register }}
              >
                {errors.phone?.message && (
                  <p className="text-red">{errors.phone?.message}</p>
                )}
              </InputField2>
            </div>
          </div>
          <PrivacyBar is_private={user?.is_private} />
          <button
            className={
              "p-5 mt-8 w-[358px] text-white leading-4 z-10 rounded-[48px] " +
              (!profileChanged
                ? "bg-[#9ca0a7]"
                : "bg-gray-900 hover:shadow-xl ")
            }
            disabled={!profileChanged}
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

ProfileSetting.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default ProfileSetting;
