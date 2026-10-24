# Exploratory testing


## Finding 1: Price filter does not filter products in the Stationery category

Summary:
    Applying a price range filter in the Stationery category does not update the product listing. Products outside the selected price range remain visible.

Steps to reproduce:
1. Navigate to the Stationery category.
2. Expand the Price filter and select a specific price range (e.g., €15.60–€16.00).
3. Inspect the product listing and compare the displayed product prices with the selected range.

Expected result:
    Only products within the selected price range should be displayed. If no products match the range, the listing should show no matching products.

Actual result:
    All products remain visible, including products outside the selected price range. The product listing does not reflect the selected filter.


## Short reflection

For a production project, I would run the registration tests in a dedicated test environment rather than relying on a shared public demo, so account state and availability are more predictable. I would expand coverage for input validation and required checkbox combinations, improve failure diagnostics for the storefront iframe, and implement a reliable test data cleanup strategy to prevent test accounts from accumulating over time. I would also consider cross-browser and accessibility testing based on the project's requirements.
