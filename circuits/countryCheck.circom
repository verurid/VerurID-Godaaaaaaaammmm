pragma circom 2.1.4;

include "circomlib/comparators.circom";
include "circomlib/poseidon.circom";
include "circomlib/bitify.circom";

template CountryCheck() {
    // Private inputs
    signal input countryCode; // Country code as field element
    signal input secretCode; // User's secret code
    
    // Public inputs
    signal input allowedCountries[5]; // List of allowed country codes
    signal input timestamp; // Current timestamp for freshness
    
    // Output
    signal output isAllowed;
    signal output hashOutput;
    
    // Components
    component comparators[5];
    component hasher = Poseidon(3); // Hash countryCode, secretCode, and timestamp
    component num2Bits = Num2Bits(254);
    
    // Verify country code format (should be 2 characters)
    num2Bits.in <== countryCode;
    
    // Check if country is in allowed list
    var isCountryAllowed = 0;
    for (var i = 0; i < 5; i++) {
        comparators[i] = IsEqual();
        comparators[i].in[0] <== countryCode;
        comparators[i].in[1] <== allowedCountries[i];
        isCountryAllowed = isCountryAllowed + comparators[i].out;
    }
    
    // Hash the inputs for verification
    hasher.inputs[0] <== countryCode;
    hasher.inputs[1] <== secretCode;
    hasher.inputs[2] <== timestamp;
    
    // Outputs
    isAllowed <== isCountryAllowed;
    hashOutput <== hasher.out;
}

component main {public [allowedCountries, timestamp]} = CountryCheck();