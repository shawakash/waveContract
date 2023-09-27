// hardhat.d.ts

declare namespace Bun {
    interface Global {
      hre: import('hardhat/types');
    }
  }