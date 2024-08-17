"use client";
import Image from "next/image";
import React from "react";
import { Fab as TinyFab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { useRouter } from "next/navigation";

const Fab = () => {
  const router = useRouter();
  return (
    <TinyFab
      alwaysShowTitle={false}
      mainButtonStyles={{
        backgroundColor: "#14b8a6",
        color: "#fff",
        fontSize: "24px",
        fontWeight: "bold",
        borderRadius: "50%",
        padding: "10px",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        objectFit: "contain",
      }}
      icon={
        <Image
          src="/ourservices.png"
          alt="plus"
          width={20}
          height={20}
          objectFit="contain"
        />
      }
    >
      <Action
        text="Fund Transfer"
        onClick={() => {
          router.push("/dashboard/fundtransfer");
        }}
        style={{ backgroundColor: "#4cBF", objectFit: "contain" }}
      >
        <Image
          src="/deposit.png"
          alt="plus"
          width={20}
          height={20}
          objectFit="contain"
        />
      </Action>

      <Action
        text="Bank Statement"
        onClick={() => {
          router.push("/dashboard/tnxhistory");
        }}
        style={{ backgroundColor: "#4cBF", objectFit: "contain" }}
      >
        <Image
          src="/income-statement.png"
          alt="plus"
          width={20}
          height={20}
          objectFit="contain"
        />
      </Action>
      <Action
        text="Open Account"
        onClick={() => {
          router.push("/dashboard/openaccount");
        }}
        style={{ backgroundColor: "#4cBF", objectFit: "contain" }}
      >
        <Image
          src="/bank-account.png"
          alt="plus"
          width={20}
          height={20}
          objectFit="contain"
        />
      </Action>
      <Action
        text="Profile Settings"
        onClick={() => {
          router.push("/dashboard/profilesettings");
        }}
        style={{ backgroundColor: "#4cBF", objectFit: "contain" }}
      >
        <Image
          src="/user-setting.png"
          alt="plus"
          width={20}
          height={20}
          objectFit="contain"
        />
      </Action>

      <Action
        text="Dashboard"
        onClick={() => {
          router.push("/dashboard");
        }}
        style={{ backgroundColor: "#4cBF", objectFit: "contain" }}
      >
        <Image
          src="/data.png"
          alt="plus"
          width={20}
          height={20}
          objectFit="contain"
        />
      </Action>
    </TinyFab>
  );
};
export default Fab;
