echo "Wait (indefenitly) until the DB creation (name: ${TESTER_DB_NAME})."
echo "The DB URL is: ${TESTER_DB_URL}"
until curl --request PUT ${TESTER_DB_URL} ; do
    echo -e "\t DB (${TESTER_DB_NAME}) wasn't created - trying again later..."
    sleep 2
done

echo "Wait (indefenitly) until the DB creation (name: ${CONTACT_DB_NAME})."
echo "The DB URL is: ${CONTACT_DB_URL}"
until curl --request PUT ${CONTACT_DB_URL} ; do
    echo -e "\t DB (${CONTACT_DB_NAME}) wasn't created - trying again later..."
    sleep 2
done    

echo "Wait (indefenitly) until the DB creation (name: ${FEEDBACK_DB_NAME})."
echo "The DB URL is: ${FEEDBACK_DB_URL}"
until curl --request PUT ${FEEDBACK_DB_URL} ; do
    echo -e "\t DB (${FEEDBACK_DB_NAME}) wasn't created - trying again later..."
    sleep 2
done    

echo "Start prm-portal service..."
npm start
