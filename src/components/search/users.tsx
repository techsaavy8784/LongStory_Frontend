import { useState, useEffect } from "react";
import Image from "next/image";

import { useAppSelector, useAppDispatch } from "@/types/hooks";
import User from "./user";
import Loading from "../loading";
import { fetchUsers, setPage } from "@/redux/slices/user/userSlice";

export function Users() {
  const users = useAppSelector((state) => state.user.users);
  const loading = useAppSelector((state) => state.user.loading);
  const page = useAppSelector((state) => state.user.page);
  const search = useAppSelector((state) => state.user.search);
  const hasNext = useAppSelector((state) => state.user.hasNext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(page, search, hasNext);
    if (hasNext) {
      fetchUsers(page, search);
    }
  }, [page, hasNext, search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [search]);

  return users && users.length === 0 && loading ? (
    <Loading />
  ) : users && users.length === 0 && !loading ? (
    <div>there are no users</div>
  ) : (
    <>
      <div className="flex flex-col gap-4">
        {users &&
          users.map((user, index) => (
            <User
              userInfo={user}
              key={index}
              isLast={index === users.length - 1}
              newLimit={() => {
                if (hasNext) {
                  dispatch(setPage(page + 1));
                }
              }}
            />
          ))}
        {loading && <Loading />}
      </div>
    </>
  );
}
