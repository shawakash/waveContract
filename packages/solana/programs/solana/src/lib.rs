use anchor_lang::prelude::*;

declare_id!("2iPwRfZMtBJroE52FUUV4i5Jm75z18KTm3mJPt2N9ZDZ");

#[program]
pub mod solana {
  use super::*;
  pub fn start_stuff_off(_ctx: Context<StartStuffOff>) -> Result <()> {
    Ok(())
  }
}

#[derive(Accounts)]
pub struct StartStuffOff {}
