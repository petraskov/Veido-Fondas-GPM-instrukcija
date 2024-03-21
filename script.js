function updateCounterValue() {
    fetch('counter.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('counter').textContent = data.counter;
        })
        .catch(error => {
            console.error('Error fetching counter value:', error);
        });
}

// Update counter value on page load
updateCounterValue();

document.getElementById('did-it-button').addEventListener('click', function() {
    if (!localStorage.getItem('didItClicked')) {
        // Increment the counter value displayed on the page
        let counterElement = document.getElementById('counter');
        let counterValue = parseInt(counterElement.textContent);
        counterValue++;
        counterElement.textContent = counterValue;

        // Prepare the JSON payload to update the counter.json file
        let updatedData = { counter: counterValue };

        // Send request to update the counter on GitHub
        fetch('https://api.github.com/repos/petraskov/Veido-Fondas-GPM-instrukcija/contents/counter.json', {
            method: 'PUT',
            headers: {
                'Authorization': 'token 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',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Increment counter',
                content: btoa(JSON.stringify(updatedData)), // Convert JSON to base64
                sha: 'a8850a831e36772540e17a3111b16d00d88dbb7a', // Replace with the actual SHA of the counter.json file
            }),
        }).then(response => {
            console.log(response)
            if (!response.ok) {
                console.error('Failed to update JSON:', response.status, response.statusText);
            }
        }).catch(error => {
            console.error('Error:', error);
        });

        // Store the updated counter value in localStorage
        //localStorage.setItem('didItClicked', true);

        // Disable the button to prevent further clicks
        //this.disabled = true;
    }
});
