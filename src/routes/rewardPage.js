import { useEffect } from "react";

import { useContextObject } from "../context";
import Header from "../components/Header";
import defaultArray from "../helpers/defaultArray";
import { useNavigate } from "react-router-dom";
export default function Proposals() {
  const router = useNavigate();
  const {
    handlePopUp,
    setPropsObj,
    propsObj,
    walletAddress,
    setWalletAddress,
    name,
    setName,
    discordID,
    setDiscordID,
    githubURL,
    setGithubURL,
    twitterHandle,
    setTwitterHandle,
  } = useContextObject();

  useEffect(() => {
    let storage = localStorage.getItem("rewardsList");
    if (!storage) {
      localStorage.setItem("rewardsList", JSON.stringify(defaultArray));
      storage = localStorage.getItem("rewardsList");
    }
    setPropsObj(JSON.parse(storage));
  }, []);
  useEffect(() => {
    if (propsObj) {
      localStorage.setItem("rewardsList", JSON.stringify(propsObj));
    }
    console.log(propsObj);
  }, [propsObj]);

  const updateStorage = (_value) => {
    const alikeArray = propsObj.filter((item) => {
      const { name, wallet_Address } = _value;
      return name == item.name || wallet_Address == item.wallet_Address;
    });
    console.log("Alike array:", alikeArray);
    if (alikeArray.length === 0) {
      setPropsObj([_value, ...propsObj]);
      setTimeout(
        () => handlePopUp(true, "Successfully Updated Reward List", false),
        500
      );
    } else {
      setTimeout(
        () => handlePopUp(true, "Unable to add Participant to Database", true),
        500
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStorage({ name, discordID, githubURL, twitterHandle, walletAddress });
    router("/");
  };

  return (
    <>
      <Header />

      <section className={`pt-4  text-gray-900`}>
        <div className="mt-6 flex justify-evenly text-3xl mb-4 uppercase w-full text-center">
          Reward Active Participants
        </div>
        <form
          className="flex flex-col  m-auto space-y-4"
          onSubmit={handleSubmit}
        >
          <span className="flex gap-3 justify-between">
            Full Name:
            <input
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Last-Name Middle-Name First-Name"
              className="p-1 leading-3 outline-none border-2  border-gray-500"
              type="text"
            />
          </span>
          <span className="flex gap-3 justify-between">
            Discord ID :
            <input
              required
              onChange={(e) => setDiscordID(e.target.value)}
              placeholder="DiscordName#1234"
              className="p-1 leading-3 outline-none border-2  border-gray-500"
              type="text"
            />
          </span>
          <span className="flex gap-3 justify-between">
            GitHub URL:
            <input
              required
              onChange={(e) => setGithubURL(e.target.value)}
              placeholder="https://github.com/github_username"
              className="p-1 leading-3 outline-none border-2  border-gray-500"
              type="url"
            />
          </span>
          <span className="flex gap-3 justify-between">
            Twitter Handle :
            <input
              required
              onChange={(e) => setTwitterHandle(e.target.value)}
              placeholder="@twitter_handle(optional)"
              className="p-1 leading-3 outline-none border-2  border-gray-500"
              type="text"
            />
          </span>
          <span className="flex gap-3 justify-between">
            Wallet Address :
            <input
              required
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="kdjf3uhuiajh938herib94h4998h89asdj"
              className="p-1 leading-3 outline-none border-2  border-gray-500"
              type="text"
            />
          </span>

          <span className=" mt-4 pt-6 flex items-center justify-center">
            <input
              type="submit"
              value="Add Participant"
              className="border-2 border-gray-500 p-2 hover:shadow-lg shadow-black transition-shadow duration-200 ease-in-out cursor-pointer "
            />
          </span>
        </form>
      </section>
    </>
  );
}
