import React, { useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const SignInModal: React.FC<ModalProps> = ({ isOpen, handleClose }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };
    setLoading(true);
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", user);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        window.location.reload();
      }
    } catch (error) {
      alert(`Sign in failed ${(error as any)?.response?.data?.message}`);
      setLoading(false);
      console.error("Sign up failed", error);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef:
      | React.RefObject<HTMLInputElement>
      | React.RefObject<HTMLButtonElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
        isOpen ? "flex" : "hidden"
      } justify-center items-center sm:items-start `}
    >
      <Image
        src="/close.svg"
        alt="close"
        height={24}
        width={24}
        className="h-6 w-6 fixed sm:right-12 xl:right-1/3 md:right-16 lg:right-80 top-32 sm:top-16 cursor-pointer "
        onClick={handleClose}
      />
      <div className="bg-white p-4 rounded-lg h-1/2 w-4/5 lg:w-1/3 mt-0 sm:mt-24 ">
        <h2 className="text-center text-2xl font-semibold mb-2">Sign In</h2>
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-md"
            required={true}
            ref={emailRef}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded-md"
            required={true}
            ref={passwordRef}
            onKeyDown={(e) => handleKeyDown(e, submitRef)}
          />

          <button
            className="bg-teal-500 text-white p-2 rounded-md"
            type="submit"
            ref={submitRef}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
