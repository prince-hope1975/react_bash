import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import processPaymentTransaction from "../helpers/processPayments";
import { useContextObject } from "../context";
import Header from "../components/Header";
import defaultArray from "../helpers/defaultArray";

// Variables needed to connect to the algorand testnet

// Take the above variables and make a connection to Algorand testnet
// using the algosdk

export default function PaymentPage() {


  const { setObjectProperties, objectProperties } = useContextObject();


  const [addressArray, setAddressArray] = useState([]);
  const [amount, setAmount] = useState(0);
  const [tablecontent, setTablecontent] = useState([]);
  const [arr, setArr] = useState([]);


  useEffect(() => {
    let storage = localStorage.getItem("rewardsList");
    if (!storage) {
      localStorage.setItem("rewardsList", JSON.stringify(defaultArray));
      storage = localStorage.getItem("rewardsList");
    }
    setObjectProperties(JSON.parse(storage));
  }, []);
  useEffect(() => {
    setArr([...tablecontent, ...arr]);
  }, [tablecontent]);

  const handlePayment = (e) => {
    e.preventDefault();
    if (addressArray.length < 1) return;
    let placeHolderArray = [];
    let finalArr = addressArray.map((_addr) => {
      return { name: "Undefined", wallet_Address: _addr, status: false };
    });

    finalArr.forEach(({ wallet_Address }, index) => {
      objectProperties.forEach((item) => {
        if (wallet_Address === item.wallet_Address) {
          finalArr[index] = { ...item, status: true };
        }
      });
    });

    finalArr.forEach(async ({ wallet_Address, status }, index) => {
      if (!status) {
        placeHolderArray.unshift({ ...finalArr[index] });
        setTablecontent([{ ...finalArr[index] }, ...tablecontent]);
      } else {
        const state = await processPaymentTransaction(wallet_Address, amount);
        finalArr[index] = { ...finalArr[index], status: state };
        placeHolderArray.unshift({ ...finalArr[index] });

        setTablecontent([{ ...finalArr[index] }, ...tablecontent]);
      }
    });
  };

  return (
    <>
      <Header />

      <section className={``}>
        <div className="">
          Pay Active Participants
        </div>
        <p className="">
          RWXX2OACYFWOH7JKS5W6HLFDXUC6GLI6MYUJTAQ5B4VH6ZFS5LQSS6MJ2I,ILSYSYHSCMQ4KSVGQEDODDA4N6ZF4CRPQASYWJBV2T5RF2FZQQKTFB5GW4,IAWNDP5OXXP7BD7I7QUMUOF35SM3IZWUW755HHDJK2VK25D7TLJY2UZGUE
        </p>
        <form className="">
          <textarea
            onChange={(e) =>
              setAddressArray([...e.target.value.split(/[ ,]+/)])
            }
            className=""
            placeholder="Copy and paste a list of addresses here"
          ></textarea>

          <span className="">
            <p>Choice Amount :</p>{" "}
            <input
              onChange={(e) => setAmount(Number(e.target.value))}
              type="number"
              className=""
            />
          </span>
          <input
            type="submit"
            value="Pay"
            onClick={handlePayment}
            className=""
          />
        </form>
      </section>
      <section className="">
        <h1 className="">
          Disbursment Status
        </h1>
        <div className={` `}>
          <span className="py-3 w-full text-center border-2 border-gray-700 bg-purple-200">
            Name{" "}
          </span>
          <span className="py-3 w-full text-center border-2 border-gray-700  bg-purple-200">
            wallet Address
          </span>
          <span className="py-3 w-full text-center border-2 border-gray-700 bg-purple-200 ">
            Status{" "}
          </span>
        </div>
        {arr &&
          arr.map(({ name, wallet_Address, status }) => {
            return (
              <div
                className={`w-full  flex items-center justify-evenly text-gray-900`}
              >
                <span className="border-2 border-gray-700 w-full text-center">
                  {" "}
                  {name}
                </span>
                <span className="border-2 border-gray-700 w-full text-center">
                  {wallet_Address.substring(0, 5)}...
                  {wallet_Address.substring(
                    wallet_Address.length - 7,
                    wallet_Address.length - 1
                  )}
                </span>
                <span
                  className={`border-2 border-gray-700 w-full text-center ${
                    status === true ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {" "}
                  {status
                    ? "Success"
                    : status === false
                    ? "Failure"
                    : `${status}`}
                </span>
              </div>
            );
          })}
      </section>
    </>
  );
}
