import { toast } from "react-toast";

export const showSuccess = (msg: string) => toast.success(msg);

export const showError = (msg: string) => toast.error(msg);

export const showInfo = (msg: string) => toast.info(msg);

export const showWarn = (msg: string) => toast.warn(msg);

export const showCustom = (msg: string) =>
  toast(msg, {
    backgroundColor: "#323131",
    color: "#ffffff"
  });
