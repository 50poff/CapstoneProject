

/*CREATE USER 'daihire' IDENTIFIED BY 'daihire';*/
GRANT SELECT, INSERT, UPDATE, SHOW VIEW on DaiHire.* to daihire;


GRANT DELETE ON PeopleAvailability TO daihire;
GRANT DELETE ON peopleProfile TO daihire;
GRANT DELETE ON candidateProfile To daihire;


