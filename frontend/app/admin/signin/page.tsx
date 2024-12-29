"use client";
import { fetcher } from "@/app/_helpers/helperFunc";
import { useContextHook } from "@/app/ContextCode";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LoginSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isLogin, setLogin] = useState(false);

  const userDetails = useContextHook();

  useEffect(() => {
    if (userDetails?.user) redirect("/admin/dashboard");
  }, [userDetails]);

  const Signinfunc = async () => {
    if (email === "" || pass === "") return toast("Please fill all the fields");
    setisloading(true);

    const data = await fetcher("/loginRoute", "POST", {
      username: email,
      password: pass,
    });

    setisloading(false);

    if (data.error) {
      toast(data.error);
      return;
    }

    setTimeout(() => {
      userDetails?.setUser(data.user);
    }, 2000);
    toast(data.message);
  };

  const Signupfunc = async () => {
    if (name === "" || email === "" || pass === "")
      return toast("Please fill all the fields");
    setisloading(true);

    const data = await fetcher("/signupRoute", "POST", {
      name,
      username: email,
      password: pass,
    });

    setisloading(false);
    if (data.status === 201) {
      toast("Signup Successfully");

      setTimeout(() => {
        setLogin(!isLogin);
      }, 2000);

      return;
    }
    toast(data.data.message);
  };
  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.access_token;

      try {
        const data = await fetcher("/accessTokenVerify", "POST", {
          token,
        });

        if (data.message === "Login successful") {
          userDetails?.setUser(data.user);
          toast("Login Successfully");
        }
      } catch (err) {
        console.error(err);
      }
    },
    onError(errorResponse) {
      console.log(errorResponse);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>
        <div className="w-[100px] h-[6px] bg-purple-500 rounded-lg mx-auto mb-6"></div>

        <div className="space-y-4">
          {!isLogin && (
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
              <Image
                src="/person.png"
                alt="Person"
                className="h-6 w-6 mr-4"
                height={24}
                width={24}
              />
              <input
                type="text"
                className="flex-1 bg-transparent outline-none"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
            <Image
              src="/email.png"
              alt="Email"
              className="h-6 w-6 mr-4"
              height={24}
              width={24}
            />
            <input
              type="email"
              className="flex-1 bg-transparent outline-none"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
            <Image
              src="/password.png"
              alt="Password"
              className="h-6 w-6 mr-4"
              height={24}
              width={24}
            />
            <input
              type="password"
              className="flex-1 bg-transparent outline-none"
              placeholder="Enter your Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          {isLogin && (
            <div className="text-right text-sm text-purple-600 cursor-pointer">
              Forgot Password?
            </div>
          )}

          <div className="flex flex-col items-center gap-4 mt-4">
            <Button
              onClick={isLogin ? Signinfunc : Signupfunc}
              disabled={isloading}
              className="w-full bg-purple-500 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition"
            >
              {isloading && <Loader2 className="animate-spin" />}
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
            <h3 className="text-red-500 font-bold">OR</h3>
            <Button
              onClick={() => handleGoogleAuth()}
              className="w-full flex items-center justify-center border-2 border-gray-300 py-3 rounded-lg transition"
            >
              <Image
                src="/google.png"
                alt="Google"
                className="h-6 w-6 mr-3"
                height={24}
                width={24}
              />
              Continue with Google
            </Button>
          </div>

          <div className="text-center text-gray-600 mt-6">
            {isLogin ? (
              <span>
                New User?{" "}
                <span
                  className="text-purple-600 cursor-pointer"
                  onClick={() => setLogin(false)}
                >
                  Create an account
                </span>
              </span>
            ) : (
              <span>
                Already a User?{" "}
                <span
                  className="text-purple-600 cursor-pointer"
                  onClick={() => setLogin(true)}
                >
                  Sign In
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
