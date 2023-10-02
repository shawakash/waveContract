import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Solana } from "../target/types/solana";

// describe("solana", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Solana as Program<Solana>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     console.log("From program")
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });

const main = async () => {
  console.log("🚀 Starting test...")

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Solana as Program<Solana>;

  const baseAccount = anchor.web3.Keypair.generate();
  
  console.log(baseAccount.publicKey);



  const tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  console.log("😇 From here")
  console.log("📝 Your transaction signature", tx);
  console.log(await program.account.baseAccount.all())

  // Fetch data from the account.
  //@ts-ignore
  const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 GIF Count', account.totalGifs)
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
