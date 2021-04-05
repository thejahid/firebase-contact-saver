import React, { useState } from "react";
import { toast } from "react-toastify";

import { auth } from "FirebaseAuth";

export const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const continueUrl = await process.env.REACT_APP_REGISTER_REDIRECT_URL;

    console.log(continueUrl);

    const config = {
      url: continueUrl,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Email is sent to ${email}. Go to your email & cLick the link to complete your registration.`
    );

    //save user email in local stroge
    window.localStorage.setItem("emailForRegistration", email);

    //clear this email
    setEmail("");
  };

  return (
    <div>
      <h4>Register</h4>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter your Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
