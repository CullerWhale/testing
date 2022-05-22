async function createSleep(event) {
    event.preventDefault();
    
    //createSleep page imports
    const title = document.querySelector('#sleep-title').value.trim();
    const sleep_description = document.querySelector('#sleep-description').value.trim();
    const hours_slept = document.querySelector('#hours-slept').value.trim();
    const dream_sw = document.getElementById('dream-sw').checked;//  querySelector('#dream-sw').value.trim();
    const dream_description = document.querySelector('#dream-description').value.trim();
    
    // Get tagIds
    const selected = document.querySelectorAll('#tagMenu option:checked');
    const tagIds = Array.from(selected).map(el => el.value);

    
    // Post sleep info to the DB
    if (title) {
        const response = await fetch('/api/sleep', {
            method: 'post',
            body: JSON.stringify({
                title,
                sleep_description,
                hours_slept,
                dream_sw,
                dream_description,
                tagIds
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    } else {
        alert("You must at least provide a title to create a sleep instance");
    }
};

// Function to show Dream Descripyion when check box + checked
function showDreamDescription() {
    // Get the checkbox
    var checkBox = document.getElementById("dream-sw");
    // Get the output text
    var text = document.getElementById("dream-description-cont");
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

document.querySelector('.sleep-form').addEventListener('submit', createSleep);
