use anchor_lang::prelude::*;

declare_id!("FkqS1AfpbyAbD9TbguoBZpz6NzGMfbfjpxAZSePW5rFq");

#[program]
pub mod solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        println!("From program");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
