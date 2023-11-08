import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solana } from "../target/types/solana";

// describe("solana", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Solana as Program<Solana>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });


const main = async () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Solana as Program<Solana>;
  //@ts-ignore
  const tx = await program.rpc.startStuffOff();

  console.log("📝 Your transaction signature", tx);
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();