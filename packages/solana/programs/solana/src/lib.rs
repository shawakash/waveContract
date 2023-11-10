use anchor_lang::prelude::*;
use rand::rngs::StdRng;
use rand::SeedableRng;
use rand::Rng;

declare_id!("2iPwRfZMtBJroE52FUUV4i5Jm75z18KTm3mJPt2N9ZDZ");

#[program]
pub mod solana {
  use super::*;
  pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> Result <()> {
    // Get a reference to the account.
    let base_account = &mut ctx.accounts.base_account;
    // Initialize total_gifs.
    base_account.total_gifs = 0;
    Ok(())
  }

  pub fn add_gif(ctx: Context<AddGif>, gif_link: String, name: String) -> Result <()> {
    let mut rng = StdRng::seed_from_u64(42);
    let uuid = rng.gen::<u64>().to_string();
    
    let base_account = &mut ctx.accounts.base_account;
    let user = &mut ctx.accounts.user;

	// Build the struct.
    let item = ItemStruct {
      gif_link: gif_link.to_string(),
      user_address: *user.to_account_info().key,
      name: name,
      votes: 0,
      uuid: uuid
    };
		
	// Add it to the gif_list vector.
    base_account.gif_list.push(item);
    base_account.total_gifs += 1;
    Ok(())
  }

  pub fn upvote(ctx: Context<Upvote>, uuid: String) -> Result <()> {
    let base_account = &mut ctx.accounts.base_account;
    let _user = &mut ctx.accounts.user;

    for gif in &mut base_account.gif_list {
      if gif.uuid == uuid {
          gif.votes += 1;
      }
    }

    Ok(())
  }

}


// Attach certain variables to the StartStuffOff context.
#[derive(Accounts)]
pub struct StartStuffOff<'info> {
  #[account(init, payer = user, space = 9000)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
  pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct AddGif<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Upvote<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  // If in-case you want to save who upvoted
  #[account(mut)]
  pub user: Signer<'info>,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub gif_link: String,
    pub user_address: Pubkey,
    pub name: String,
    pub uuid: String,
    pub votes: i32
}
// Tell Solana what we want to store on this account.
#[account]
pub struct BaseAccount {
  pub total_gifs: u64,
  pub gif_list: Vec<ItemStruct>,
}
