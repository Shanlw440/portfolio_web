-- SQL Analysis for Telecom Customer Churn
-- Analyst: Shannon
-- Date: July 4, 2025

-- ====================================================================
-- Question 1: What is the overall customer churn rate?
-- ====================================================================
-- This query calculates the total percentage of customers who have churned.

SELECT 
    100.0 * (SELECT COUNT(*) FROM ChurnData WHERE Churn = 'Yes') / (SELECT COUNT(*) FROM ChurnData) AS "Overall Churn Rate (%)";


-- ====================================================================
-- Question 2: How does churn rate differ for different contract types?
-- ====================================================================
-- This query groups customers by their contract type to see if short-term
-- contracts have higher churn.

SELECT
    Contract,
    COUNT(*) AS TotalCustomers,
    SUM(CASE WHEN Churn = 'Yes' THEN 1 ELSE 0 END) AS ChurnedCustomers,
    100.0 * SUM(CASE WHEN Churn = 'Yes' THEN 1 ELSE 0 END) / COUNT(*) AS "Churn Rate (%)"
FROM
    ChurnData
GROUP BY
    Contract
ORDER BY
    "Churn Rate (%)" DESC;


-- ====================================================================
-- Question 3: What are the average monthly charges for churned vs. non-churned customers?
-- ====================================================================
-- This helps us understand if customers who leave are paying more on average.

SELECT
    Churn,
    AVG(MonthlyCharges) AS "Average Monthly Charges"
FROM
    ChurnData
GROUP BY
    Churn;


-- ====================================================================
-- Question 4: Which internet service type has the highest churn rate?
-- ====================================================================
-- This helps identify if a specific service, like Fiber optic, is causing more customers to leave.

SELECT
    InternetService,
    COUNT(*) AS TotalCustomers,
    SUM(CASE WHEN Churn = 'Yes' THEN 1 ELSE 0 END) AS ChurnedCustomers,
    100.0 * SUM(CASE WHEN Churn = 'Yes' THEN 1 ELSE 0 END) / COUNT(*) AS "Churn Rate (%)"
FROM
    ChurnData
GROUP BY
    InternetService
ORDER BY
    "Churn Rate (%)" DESC;


-- ====================================================================
-- Question 5: Do customers with dependents churn less than those without?
-- =================================_===================================
-- This query checks if having dependents (a spouse or children) makes a customer more loyal.

SELECT
    Dependents,
    COUNT(*) AS TotalCustomers,
    SUM(CASE WHEN Churn = 'Yes' THEN 1 ELSE 0 END) AS ChurnedCustomers,
    100.0 * SUM(CASE WHEN Churn = 'Yes' THEN 1 ELSE 0 END) / COUNT(*) AS "Churn Rate (%)"
FROM
    ChurnData
GROUP BY
    Dependents
ORDER BY
    "Churn Rate (%)" DESC;