# 🚀 Setup Guide - Birthday Payment App

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Paystack account (for payment processing)

---

## ⚙️ Environment Configuration

### Step 1: Copy Environment File

```bash
cp .env.example .env
```

### Step 2: Configure Paystack

1. **Get your Paystack Public Key:**
   - Go to [Paystack Dashboard](https://dashboard.paystack.com/)
   - Navigate to **Settings** → **API Keys & Webhooks**
   - Copy your **Public Key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)

2. **Update `.env` file:**
   ```env
   VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_actual_key_here
   ```

### Step 3: Configure Crypto Wallet Addresses

Update the following in your `.env` file with your actual wallet addresses:

#### Bitcoin (BTC)
```env
VITE_BTC_ADDRESS=your_bitcoin_address_here
VITE_BTC_NETWORK=Bitcoin Network
```

#### Ethereum (ETH)
```env
VITE_ETH_ADDRESS=your_ethereum_address_here
VITE_ETH_NETWORK=Ethereum (ERC-20)
```

#### Tether (USDT)
```env
VITE_USDT_ADDRESS=your_ethereum_address_here
VITE_USDT_NETWORK=Ethereum (ERC-20)
VITE_USDT_TOKEN=USDT
```

#### Binance Coin (BNB)
```env
VITE_BNB_ADDRESS=your_bnb_address_here
VITE_BNB_NETWORK=BNB Smart Chain (BEP-20)
```

#### USD Coin (USDC)
```env
VITE_USDC_ADDRESS=your_ethereum_address_here
VITE_USDC_NETWORK=Ethereum (ERC-20)
VITE_USDC_TOKEN=USDC
```

#### Solana (SOL)
```env
VITE_SOL_ADDRESS=your_solana_address_here
VITE_SOL_NETWORK=Solana Network
```

#### Ripple (XRP)
```env
VITE_XRP_ADDRESS=your_xrp_address_here
VITE_XRP_NETWORK=XRP Ledger
VITE_XRP_TAG=your_destination_tag
```

#### Cardano (ADA)
```env
VITE_ADA_ADDRESS=your_cardano_address_here
VITE_ADA_NETWORK=Cardano Network
```

---

## 🔧 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open at: **http://localhost:3000**

---

## 🧪 Testing Paystack Integration

### Test Mode

When using `pk_test_` keys, Paystack runs in test mode:

#### Test Cards for Mobile Money:
- **MTN Mobile Money:** Use any valid phone number
- **Vodafone Cash:** Use any valid phone number
- **AirtelTigo Money:** Use any valid phone number

#### Test Cards for Bank Transfer:
Paystack will provide test bank account details in the payment popup.

#### Test Card Numbers:
- **Successful Payment:** 4084084084084081
- **Insufficient Funds:** 5060666666666666666
- **Declined:** 5061020000000000094

**CVV:** Any 3 digits  
**Expiry:** Any future date  
**PIN:** 1234

### Live Mode

1. Switch to live keys: `pk_live_...`
2. Complete Paystack KYC verification
3. Test with real transactions

---

## 🎯 Payment Flow

### Mobile Money / Bank Transfer (Paystack)

1. User enters name, email, and message
2. Selects "Mobile Money" or "Bank Transfer"
3. Paystack popup opens
4. User completes payment
5. Redirected to success page

### Cryptocurrency

1. User enters name, email, and message
2. Selects "Cryptocurrency"
3. Chooses exchange (Binance or OKX)
4. Selects cryptocurrency (BTC, ETH, USDT, etc.)
5. Modal shows wallet address with copy button
6. User sends crypto manually
7. Clicks "I've Sent the Payment"
8. Redirected to success page

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep `.env` file private (never commit to git)
- Use test keys during development
- Verify all transactions on Paystack dashboard
- Use separate wallets for different cryptocurrencies
- Enable 2FA on your Paystack account

### ❌ DON'T:
- Share your API keys publicly
- Commit `.env` to version control
- Use live keys in development
- Store private keys in the frontend

---

## 📊 Monitoring Payments

### Paystack Dashboard
- View all transactions
- Check payment status
- Download transaction reports
- Manage refunds

### Crypto Payments
- Monitor wallet addresses on blockchain explorers:
  - Bitcoin: https://blockchain.com
  - Ethereum: https://etherscan.io
  - Binance: https://bscscan.com
  - Solana: https://solscan.io
  - XRP: https://xrpscan.com
  - Cardano: https://cardanoscan.io

---

## 🐛 Troubleshooting

### Paystack popup not showing?
- Check if `VITE_PAYSTACK_PUBLIC_KEY` is set correctly
- Verify Paystack script is loaded in `index.html`
- Check browser console for errors

### Crypto addresses not showing?
- Verify environment variables are set
- Restart dev server after changing `.env`
- Check for typos in variable names

### Payment not recording?
- Check browser console for errors
- Verify localStorage is enabled
- Check network tab for failed requests

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify/Vercel

1. Connect your repository
2. Add environment variables in dashboard
3. Deploy!

**Important:** Add all `VITE_*` environment variables in your hosting platform's dashboard.

---

## 📞 Support

For issues or questions:
- Check the [Paystack Documentation](https://paystack.com/docs)
- Review blockchain explorer guides
- Contact support@birthdayapp.com

---

## ✅ Checklist

Before going live:

- [ ] Replace all test keys with live keys
- [ ] Verify all wallet addresses are correct
- [ ] Test all payment methods
- [ ] Enable Paystack webhooks (optional)
- [ ] Set up transaction monitoring
- [ ] Configure proper error handling
- [ ] Add analytics tracking
- [ ] Test on mobile devices
- [ ] Review security settings

---

**🎉 You're all set! Happy gifting!**
