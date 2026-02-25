# Acme Widget Co Sales System

A proof of concept sales system for Acme Widget Co, built with TypeScript and React.

## Features

- **Product Catalog**: Three widgets with different prices
- **Smart Delivery Pricing**: Automatic delivery cost calculation based on order value
  - Under $50: $4.95 delivery
  - Under $90: $2.95 delivery
  - $90 or more: FREE delivery
- **Special Offers**: "Buy one Red Widget, get the second half price"
- **Real-time Basket Updates**: Instant feedback when adding/removing items
- **Clean, Modern UI**: Responsive design with smooth animations

## How It Works

### Core Logic (`/src/logic`)

The business logic is completely separated from the UI:

- **`basket.ts`**: Main Basket class handling all calculations
  - `addItem()`: Adds products to basket
  - `getTotal()`: Calculates final price including offers and delivery
  - `applyOffers()`: Applies special offer rules
  - `calculateDelivery()`: Determines delivery cost based on subtotal

- **`types.ts`**: TypeScript interfaces for type safety
- **`baseData.ts`**: all data configuration

### UI Components (`/src/components`)

- **`ProductList.tsx`**: Displays available products with add buttons
- **`BasketSummary.tsx`**: Shows basket contents and cost breakdown
- **`BasketBoard.tsx`**: Main container managing state and logic

## Key Design Decisions

1. **Separation of Concerns**: Business logic isolated from UI for easy testing and updates
2. **Type Safety**: Full TypeScript implementation catching errors at compile time
3. **Configurable Rules**: Delivery and offer rules are passed as parameters, making them easy to modify
4. **Immutability**: Basket state updates are predictable and trackable
5. **Responsive Design**: Works on desktop and mobile devices

## Testing the Examples

The system matches all provided examples:

| Products | Expected Total | Actual |
|----------|---------------|--------|
| B01, G01 | $37.85 | $37.85 |
| R01, R01 | $54.37 | $54.37 |
| R01, G01 | $60.85 | $60.85 |
| B01, B01, R01, R01, R01 | $98.27 | $98.27 |

## Assumptions Made

1. **Offer Application**: The "buy one red widget, get the second half price" offer applies to pairs, not all red widgets (i.e., 3 red widgets = 1 full price + 1 half price + 1 full price)
2. **Delivery Calculation**: Delivery is calculated AFTER offers are applied (as implied by the examples)
3. **Currency**: All prices are in USD with 2 decimal places
4. **Rounding**: All calculations are rounded to 2 decimal places at the final stage

## Running the Project

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
