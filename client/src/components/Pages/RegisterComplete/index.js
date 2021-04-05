import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { auth } from "FirebaseAuth";

export const RegisterComplete = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  //props history from browserrouter so we can directly redirect to another page with login
  const { history } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validaton
    if (!email || !password) {
      toast.error("Email & Password is required");
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 character long");
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //remove user email form localstroage
        window.localStorage.removeItem("emailForRegistration");

        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();

        //redux store
        console.log("user", user, "idTokenResult", idTokenResult);

        //redirect to dashboard
        history.push("/");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h4>Complete Register</h4>

      <form onSubmit={handleSubmit}>
        <input type="email" defaultValue={email} />
        <input
          placeholder="Enter your password."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Complete Registration</button>
      </form>
    </div>
  );
};
