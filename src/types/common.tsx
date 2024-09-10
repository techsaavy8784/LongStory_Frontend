export interface SortItem {
  title: string;
  active: boolean;
  onclick?: () => void;
}

export interface userProfile {
  name?: string;
  avatar?: string;
}

export interface Product {
  imgList: string[];
  users: userProfile[];
  numOfLikes: number;
  title: string;
  description: string;
  price: number;
}

export interface SubBtnGroup {
  onclickGadget?: () => void;
  onclickCollection?: () => void;
}

export interface BtnGroup {
  onclickOrder?: () => void;
  onclickBuy?: () => void;
}

export interface SingleBtnGroup {
  title: string;
  onclickOrder?: () => void;
  onclickBuy?: () => void;
}

export interface SecondBarItem {
  title: string;
  active: boolean;
  url: string;
  onclick?: () => void;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  birthDay: string;
  phoneNumber: string;
  avatar: string;
}

interface Option {
  label: string;
  value: string;
}

export interface InputBar {
  type: string;
  label: string;
  img: string;
  placeholder: string;
  comboOptions: Option[];
  value1: string | number;
}

export interface PrivacyBarType {
  type: "Public" | "Private";
}

export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

export interface OptionBarType {
  label: string;
  value: string;
  img?: string;
}

export interface RadioProps {
  options: OptionBarType[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
  btnFlag: boolean;
  labelFlag: boolean;
}

export interface SearchBarProps {
  type: "product" | "people";
  value: string;
}

export interface StatusFollow {
  src: string;
  name: string;
  imgList: string[];
}
export interface StatusFollow1 {
  src: string;
  name: string;
}
export interface Sign {
  status: string;
  value: string;
}
export interface StatusBar {
  sign: Sign;
  subTitle: string;
  title: string;
}
