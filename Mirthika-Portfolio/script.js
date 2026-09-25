/* =====================================================
   GOOGLE APPS SCRIPT URL
===================================================== */

const scriptURL =
    "https://script.google.com/macros/s/AKfycbzCglz8yn3ziV39Zvj9KvQIvamDiFAiDyEQz-oiN9slDLZTYurNh5vP_D7oIt3QrEHM/exec";



/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();

        const responseMessage =
            document.getElementById("responseMessage");


        /* VALIDATION */

        if (!name || !email || !message) {

            responseMessage.textContent =
                "Please fill in all fields.";

            responseMessage.style.color =
                "red";

            return;
        }


        /* CREATE RESPONSE */

        const response = {

            name: name,

            email: email,

            message: message,

            timestamp:
                new Date().toLocaleString()

        };


        /* ==========================================
           SHOW SUCCESS IMMEDIATELY
        ========================================== */

        responseMessage.textContent =
            "✅ Message submitted successfully!";

        responseMessage.style.color =
            "green";


        /* ==========================================
           CLEAR FORM AFTER 2 SECONDS
        ========================================== */

        setTimeout(function() {

            contactForm.reset();

        }, 2000);


        /* ==========================================
           SEND TO GOOGLE SHEETS IN BACKGROUND

           IMPORTANT:
           Do NOT use await here.
           This allows the success message
           to appear immediately.
        ========================================== */

        fetch(
            scriptURL,
            {
                method: "POST",
                body: JSON.stringify(response)
            }
        )
        .then(function(response) {

            if (!response.ok) {

                throw new Error(
                    "Google Sheets submission failed"
                );

            }

        })
        .catch(function(error) {

            console.error(
                "Google Sheets error:",
                error
            );

        });

    }
);




/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


themeToggle.addEventListener(
    "click",
    function() {


        document.body.classList.toggle(
            "dark"
        );


        /* ---------------------------------------------
           CHANGE ICON
        --------------------------------------------- */

        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            themeToggle.textContent =
                "☀️";

        }
        else {

            themeToggle.textContent =
                "🌙";

        }

    }
);





/* =====================================================
   ADMIN LOGIN
===================================================== */

const adminLoginButton =
    document.getElementById(
        "adminLoginButton"
    );


adminLoginButton.addEventListener(
    "click",
    function() {


        /* ---------------------------------------------
           GET LOGIN VALUES
        --------------------------------------------- */

        const username =
            document
                .getElementById(
                    "adminUsername"
                )
                .value
                .trim();


        const password =
            document.getElementById(
                "adminPassword"
            ).value;


        const loginMessage =
            document.getElementById(
                "loginMessage"
            );



        /* ---------------------------------------------
           ADMIN LOGIN DETAILS

           Username: mirthika
           Password: 11dec2006
        --------------------------------------------- */

        if (
            username === "mirthika" &&
            password === "11dec2006"
        ) {


            /* -----------------------------------------
               LOGIN SUCCESS
            ----------------------------------------- */

            loginMessage.textContent =
                "Login successful!";


            loginMessage.style.color =
                "green";



            /* -----------------------------------------
               HIDE LOGIN BOX
            ----------------------------------------- */

            document.getElementById(
                "adminLoginBox"
            ).style.display =
                "none";



            /* -----------------------------------------
               SHOW ADMIN DASHBOARD
            ----------------------------------------- */

            document.getElementById(
                "adminDashboard"
            ).style.display =
                "block";



            /* -----------------------------------------
               LOAD GOOGLE SHEET RESPONSES
            ----------------------------------------- */

            displayResponses();

        }
        else {


            /* -----------------------------------------
               LOGIN FAILED
            ----------------------------------------- */

            loginMessage.textContent =
                "Invalid username or password.";


            loginMessage.style.color =
                "red";

        }

    }
);





/* =====================================================
   DISPLAY USER RESPONSES
   FROM GOOGLE SHEETS
===================================================== */

async function displayResponses() {


    const responsesContainer =
        document.getElementById(
            "responsesContainer"
        );


    /* ---------------------------------------------
       SHOW LOADING MESSAGE
    --------------------------------------------- */

    responsesContainer.innerHTML = `

        <div class="no-responses">

            Loading user responses...

        </div>

    `;



    try {


        /* -----------------------------------------
           GET DATA FROM GOOGLE SHEETS
        ----------------------------------------- */

        const response =
            await fetch(
                scriptURL
            );



        /* -----------------------------------------
           CHECK SERVER RESPONSE
        ----------------------------------------- */

        if (!response.ok) {

            throw new Error(
                "Unable to fetch responses"
            );

        }



        /* -----------------------------------------
           CONVERT RESPONSE TO JSON
        ----------------------------------------- */

        const responses =
            await response.json();



        /* -----------------------------------------
           CLEAR LOADING MESSAGE
        ----------------------------------------- */

        responsesContainer.innerHTML =
            "";



        /* -----------------------------------------
           NO RESPONSES
        ----------------------------------------- */

        if (
            responses.length === 0
        ) {

            responsesContainer.innerHTML = `

                <div class="no-responses">

                    No user responses available yet.

                </div>

            `;

            return;

        }



        /* -----------------------------------------
           DISPLAY EACH RESPONSE
        ----------------------------------------- */

        responses.forEach(
            function(response) {


                /* Create card */

                const responseCard =
                    document.createElement(
                        "div"
                    );


                responseCard.className =
                    "response-card";



                /* ---------------------------------
                   NAME
                --------------------------------- */

                const name =
                    document.createElement(
                        "h4"
                    );

                name.textContent =
                    response.name;



                /* ---------------------------------
                   EMAIL
                --------------------------------- */

                const email =
                    document.createElement(
                        "p"
                    );

                const emailLabel =
                    document.createElement(
                        "strong"
                    );

                emailLabel.textContent =
                    "Email: ";


                email.appendChild(
                    emailLabel
                );


                email.appendChild(
                    document.createTextNode(
                        response.email
                    )
                );



                /* ---------------------------------
                   MESSAGE
                --------------------------------- */

                const message =
                    document.createElement(
                        "p"
                    );

                const messageLabel =
                    document.createElement(
                        "strong"
                    );

                messageLabel.textContent =
                    "Message: ";


                message.appendChild(
                    messageLabel
                );


                message.appendChild(
                    document.createTextNode(
                        response.message
                    )
                );



                /* ---------------------------------
                   TIMESTAMP
                --------------------------------- */

                const timestamp =
                    document.createElement(
                        "p"
                    );


                timestamp.className =
                    "response-time";


                const timestampLabel =
                    document.createElement(
                        "strong"
                    );


                timestampLabel.textContent =
                    "Submitted: ";


                timestamp.appendChild(
                    timestampLabel
                );


                timestamp.appendChild(
                    document.createTextNode(
                        response.timestamp
                    )
                );



                /* ---------------------------------
                   ADD CONTENT TO CARD
                --------------------------------- */

                responseCard.appendChild(
                    name
                );


                responseCard.appendChild(
                    email
                );


                responseCard.appendChild(
                    message
                );


                responseCard.appendChild(
                    timestamp
                );



                /* ---------------------------------
                   ADD CARD TO PAGE
                --------------------------------- */

                responsesContainer.appendChild(
                    responseCard
                );

            }
        );

    }
    catch (error) {


        /* -----------------------------------------
           ERROR MESSAGE
        ----------------------------------------- */

        console.error(error);


        responsesContainer.innerHTML = `

            <div class="no-responses">

                ❌ Unable to load responses
                from Google Sheets.

            </div>

        `;

    }

}





/* =====================================================
   LOGOUT
===================================================== */

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


logoutButton.addEventListener(
    "click",
    function() {


        /* ---------------------------------------------
           HIDE ADMIN DASHBOARD
        --------------------------------------------- */

        document.getElementById(
            "adminDashboard"
        ).style.display =
            "none";



        /* ---------------------------------------------
           SHOW LOGIN BOX
        --------------------------------------------- */

        document.getElementById(
            "adminLoginBox"
        ).style.display =
            "flex";



        /* ---------------------------------------------
           CLEAR USERNAME
        --------------------------------------------- */

        document.getElementById(
            "adminUsername"
        ).value =
            "";



        /* ---------------------------------------------
           CLEAR PASSWORD
        --------------------------------------------- */

        document.getElementById(
            "adminPassword"
        ).value =
            "";



        /* ---------------------------------------------
           CLEAR LOGIN MESSAGE
        --------------------------------------------- */

        document.getElementById(
            "loginMessage"
        ).textContent =
            "";

    }
);