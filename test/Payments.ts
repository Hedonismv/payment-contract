import {ethers} from "hardhat";
import {Payments} from "../typechain-types";
import {Signer} from "ethers";
import {TransactionRequest} from "@ethersproject/providers";


describe("Payments", function() {
    let owner: Signer
    let other_address: Signer
    let payContract:Payments

    beforeEach(async function() {
        [owner, other_address] = await ethers.getSigners();

        const PaymentsContract = await ethers.getContractFactory("Payments",owner);
        payContract = await PaymentsContract.deploy();
        await payContract.deployed();
    })

    async function sendMoney(amount: number, sender:Signer){
        const txData:TransactionRequest = {
            to: payContract.address,
            value: amount,
            data: "0x",
            gasLimit: 6721975,
            gasPrice: 1000000000,
            nonce: 0
        }

        const tx = await sender.sendTransaction(txData);
        await tx.wait();

        return [tx,amount];

    }

    it("should be able to pay", async function() {
        const [sendMoneyTx, amount] = await sendMoney(1000,other_address);
        console.log(sendMoneyTx)
    })
})
