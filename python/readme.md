Python README:

THe python wps has 2 services

The init service:
/cgi-bin/pywps.cgi?&service=wps&request=Execute&version=1.0.0&identifier=impact_init
-needs no input, gives initialization data from the config to the front-end

The query service:
/cgi-bin/pywps.cgi?&service=wps&request=Execute&version=1.0.0&identifier=impact_query
 -needs input data from the form: wetness, province and rainfall
 
 The pywps is a wrapper around python code that handles the data querying from the xml.
 There is also a config file, which holds defaults and sets search limits.
 

From the backend PyWPS version 3 under Apache24 provides the REST services to the frontend. [Based on Python 2.7.X]
There is this Deltares wiki tutorial on how to install it on Windows but I do recommend Linux.
Way easier installation and less issues.
https://publicwiki.deltares.nl/display/OET/Setting+up+pyWPS+in+a+Windows+environment

We tested the PyWPS service on a Linux VM here at Deltares and it works. 
[PyWPS version 3 and python version 2.7, preferably via Anaconda2]
We will have to elaborate a list of the required python packages and versions needed for the application to run such as pandas or xlrd.
