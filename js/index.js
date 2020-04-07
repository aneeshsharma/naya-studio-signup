var maker_choice = document.getElementById("#maker-choice");

var desg_choice = document.getElementById("#desg-choice");

var select_event;

var is_designer = false,
    is_maker = false;

var materials = [];

var submitData = {};

select_event = document.createEvent("HTMLEvents");
select_event.initEvent("select-option", true, true);
select_event.eventName = "select-option";

maker_choice.addEventListener("select-option", () => {
    if (maker_choice.classList.contains("checked")) {
        is_maker = true;
        document.getElementById("maker-data").style = "display: flex;";
    } else if (maker_choice.classList.contains("unchecked")) {
        is_maker = false;
        document.getElementById("maker-data").style = "display: none;";
    }

    if (is_maker || is_designer) {
        enableProceed();
    } else {
        disableProceed();
    }
});

desg_choice.addEventListener("select-option", () => {
    if (desg_choice.classList.contains("checked")) {
        is_designer = true;
        document.getElementById("desg-data").style = "display: flex;";
    } else if (desg_choice.classList.contains("unchecked")) {
        is_designer = false;
        document.getElementById("desg-data").style = "display: none;";
    }

    if (is_maker || is_designer) {
        enableProceed();
    } else {
        disableProceed();
    }
});

document.getElementById("proceed-button").addEventListener("click", () => {
    submit();
});

function initializeCheckBoxes() {
    var boxes = [].slice.call(document.getElementsByClassName("check-btn"));
    console.log(boxes);
    boxes.forEach((item) => {
        item.addEventListener("click", () => {
            handleToggle(item);
        });
    });
}

function handleToggle(item) {
    if (item.classList.contains("unchecked")) {
        item.classList.remove("unchecked");
        item.classList.add("checked");
    } else if (item.classList.contains("checked")) {
        item.classList.remove("checked");
        item.classList.add("unchecked");
    }
    item.dispatchEvent(select_event);
}

function initializeProjectOptions() {
    var selector = document.getElementById("no_projects");
    selector.innerHTML = '<option value="---Select---">---Select---</option>';
    for (i = 1; i <= 10; i++) {
        selector.innerHTML += '<option value="' + i + '">' + i + "</option>";
    }
    selector.innerHTML += '<option value="10+">10+</option>';
}

function nextDomain() {
    if (is_maker) {
        document.getElementById("maker-data").scrollIntoView();
    } else if (is_designer) {
        document.getElementById("desg-data").scrollIntoView();
    } else {
        alert("Please select either maker or designer!");
        document.getElementById("domain").scrollIntoView();
    }
}

function previousDomain() {
    if (is_maker) {
        document.getElementById("maker-data").scrollIntoView();
    } else {
        document.getElementById("credentials").scrollIntoView();
    }
}

function makerFilled() {
    if (is_designer) {
        document.getElementById("desg-data").scrollIntoView();
    } else {
        document.getElementById("form-complete").scrollIntoView();
    }
}

function refill() {
    if (is_designer) {
        document.getElementById("desg-data").scrollIntoView();
    } else if (is_maker) {
        document.getElementById("maker-data").scrollIntoView();
    } else {
        document.getElementById("credentials").scrollIntoView();
    }
}

function disableProceed() {
    document.getElementById("proceed-button").disabled = true;
    document.getElementById("proceed-message").innerHTML =
        "<h1>Please complete the form</h1> Maker sure all your data is correct and that you have chosen atleast one of Maker or designer";
}

function enableProceed() {
    document.getElementById("proceed-button").disabled = false;
    document.getElementById("proceed-message").innerHTML =
        "<h1>You're all set!</h1> Click proceed to complete registration";
}

function getMaterials() {
    materials = [];
    var selectors = [].slice.call(document.getElementsByName("materials"));
    selectors.forEach((item) => {
        if (isSelected(item)) {
            materials.push(item.value);
        }
    });

    console.log("Materials:" + materials);
}

function isSelected(item) {
    return item.classList.contains("checked");
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function verifyCred() {
    if (!validateEmail(document.getElementById("email").value)) {
        alert("Please enter a valid email");
        return false;
    }

    if (
        document.getElementById("password").value !=
        document.getElementById("rpassword").value
    ) {
        alert("Passwords don't match!");
        return false;
    }

    if (document.getElementById("password").value.length < 6) {
        alert("Please enter a valid password with at least 6 characters");
        return false;
    }
    return true;
}

function verifyForm() {
    if (!verifyCred()) {
        document.getElementById("credentials").scrollIntoView();
        return false;
    }

    submitData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    if (is_maker) {
        if (document.getElementById("no_projects").value == "---Select---") {
            alert("Specify number of projects you work at a time");
            document.getElementById("maker-data").scrollIntoView();
            return false;
        }
        getMaterials();
        if (materials.length == 0) {
            alert(
                "Please select at least one material to work with as a maker"
            );
            document.getElementById("maker-data").scrollIntoView();
            return false;
        }

        var location = document.getElementById("location").value;
        if (location.length < 4) {
            alert("Please enter a valid address");
            document.getElementById("maker-data").scrollIntoView();
            return false;
        }

        submitData["is_maker"] = true;
        submitData["materials"] = materials;
        submitData["no_projects"] = document.getElementById(
            "no_projects"
        ).value;
    }

    if (is_designer) {
        var hours = document.getElementById("time_week").value;
        if (hours <= 0 || hours >= 100) {
            alert("Please enter valid number of hours!");
            document.getElementById("desg-data").scrollIntoView();
            return false;
        }

        var profession = document.getElementById("desg-profession").value;
        if (profession == "---Select One--") {
            alert("Please select a valid profession as a designer");
            document.getElementById("desg-data").scrollIntoView();
            return false;
        }

        var education = document.getElementById("education").value;
        if (education.length < 5) {
            alert("Please specify your education level/type clearly");
            document.getElementById("desg-data").scrollIntoView();
            return false;
        }

        submitData["is_desg"] = true;
        submitData["hours_week"] = hours;
        submitData["desg_profession"] = profession;
        submitData["education"] = education;
    }
    console.log("Got data -" + submitData);
    return true;
}

function submit() {
    if (verifyForm()) {
        console.log(submitData);
        $.ajax({
            url: "http://friday.banaborg.tech:7800/",
            type: "GET",
            contentType: "application/json",
            success: (result) => {
                window.location = "success.html";
            },
            error: (xhr, status, error) => {
                alert("Error occurred while registering!");
            },
            data: submitData,
        });
    }
}

initializeCheckBoxes();
initializeProjectOptions();
disableProceed();
