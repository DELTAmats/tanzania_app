
	var wps;


    $(document).ready(function() {
            // get selected wps (url)
            var wpsUrl = "http://tw-089.xtr.deltares.nl/cgi-bin/pywps.cgi";

            wps = new WpsService({url : wpsUrl, version : "1.0.0"});

            wps.getCapabilities_POST(capabilitiesCallback);

    });

    var capabilitiesCallback = function(response) {
        var doc = response.getRawResponseDocument();
        $("textarea#xml").val((new XMLSerializer()).serializeToString(doc));

        var test = response.capabilities.processes;

        alert("success");
    };
		
	var describeProcessCallback = function(response) {
			
	var doc = response.getRawResponseDocument();
	$("textarea#xml").val((new XMLSerializer()).serializeToString(doc));
	
		var test = response.processOffering;
			
		alert("success");
	};
		
	var describeProcess = function() {
			
			wps.describeProcess_POST(describeProcessCallback, "addeventtheme");
	};
		
	var executeCallback = function(response) {
			
		var doc = response.getRawResponseDocument();
		try {
			(new XMLSerializer()).serializeToString(doc);
		} catch (e){
			doc;
		}			
		alert("success");
	};	
		
	var execute_v1 = function() {
		
		wps = new WpsService({url : "http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService", version : "2.0.0"});
		
		//inputs
		var inputGenerator = new InputGenerator();
		var referenceInput = inputGenerator.createComplexDataInput_wps_1_0_and_2_0("data",
				"text/xml", "http://schemas.opengis.net/gml/3.1.1/base/feature.xsd", null, true, "http://geoprocessing.demo.52north.org:8080/geoserver/wfs?SERVICE=WFS&amp;VERSION=1.0.0&amp;REQUEST=GetFeature&amp;TYPENAME=topp:tasmania_roads&amp;SRS=EPSG:4326&amp;OUTPUTFORMAT=GML3");
		var literalInput = inputGenerator.createLiteralDataInput_wps_1_0_and_2_0("width", "xs:double",
				null, "0.05");
		var inputs = [referenceInput, literalInput];
		
		//outputs
		var outputGenerator = new OutputGenerator();
		var complexOutput = outputGenerator.createComplexOutput_WPS_1_0("result", "text/xml", 
				"http://schemas.opengis.net/gml/3.1.1/base/feature.xsd", "UTF-8", null, false, "result", "result");
		var outputs = [complexOutput];	
		
		
		wps.execute(executeCallback, "org.n52.wps.server.algorithm.SimpleBufferAlgorithm", "document",
				"async", false, inputs, outputs);
	};	
	
    var execute_v2 = function() {
		
		//inputs
		var inputGenerator = new InputGenerator();
		var referenceInput = inputGenerator.createComplexDataInput_wps_1_0_and_2_0("data",
				"text/xml", "http://schemas.opengis.net/gml/3.1.1/base/feature.xsd", null, true, "http://geoprocessing.demo.52north.org:8080/geoserver/wfs?SERVICE=WFS&amp;VERSION=1.0.0&amp;REQUEST=GetFeature&amp;TYPENAME=topp:tasmania_roads&amp;SRS=EPSG:4326&amp;OUTPUTFORMAT=GML3");
		var literalInput = inputGenerator.createLiteralDataInput_wps_1_0_and_2_0("width", null,
				null, "0.05");
		var inputs = [referenceInput, literalInput];
		
		//outputs
		var outputGenerator = new OutputGenerator();
		var complexOutput = outputGenerator.createComplexOutput_WPS_2_0("result", "text/xml", 
				"http://schemas.opengis.net/gml/3.1.1/base/feature.xsd", "UTF-8", "value");
		var outputs = [complexOutput];	
		
		
		wps.execute(executeCallback, "org.n52.wps.server.algorithm.SimpleBufferAlgorithm", "raw",
				"sync", false, inputs, outputs);
	};	
	
	var getResultCallback = function(response){
		var doc = response.getRawResponseDocument();
		try {
			doc = (new XMLSerializer()).serializeToString(doc);
		} catch (e){
			doc;
		}
        
        //check error
        if(doc.)
		alert("success");
	}
	
	var getResult = function(){
		wps = new WpsService({url : "http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService", version : "2.0.0"});
		
		wps.getResult_WPS_2_0(getResultCallback, "2f77dd20-20e5-48a8-a220-019924ef4c88");
	}
		
    function testExecuteRequest_wps_2_0(){
        var inputGenerator = new InputGenerator();
        var literalInput = inputGenerator.createLiteralDataInput_wps_1_0_and_2_0("literalId", "myDataType",
                "myUOM", "myValue");
        var literalInput2 = inputGenerator.createLiteralDataInput_wps_1_0_and_2_0("literalId", null,
                null, "myValue");
        var complexInput = inputGenerator.createComplexDataInput_wps_1_0_and_2_0("complexId",
                "myMimeType", null, null, false, "<test><test2>hello</test2></test>");
        var bboxInput = inputGenerator.createBboxDataInput_wps_1_0_and_2_0("myBBOX", "EPSG:4326",
                "2", "0.0 0.0", "50.0 50.0");

        var referenceInput = inputGenerator.createComplexDataInput_wps_1_0_and_2_0("complexId",
                "myMimeType", "mySchema", null, true, "http://myReferenceUrl");

        var inputs = [literalInput, literalInput2, complexInput, bboxInput, referenceInput];

        //outputs
        var outputGenerator = new OutputGenerator();
        //var literalOutput = outputGenerator.createLiteralOutput_WPS_2_0("literalOutput", "reference");
        var complexOutput = outputGenerator.createComplexOutput_WPS_2_0("complexOutput", "myMimeType", 
                "mySchema", "myEncoding", "value");

        var outputs = [complexOutput];

        var executeRequest = new ExecuteRequest_v2({
            url : "testUrl",
            version : "2.0.0",
            processIdentifier : "myProcess",
            responseFormat : "raw",
            executionMode : "async",
            inputs : inputs,
            outputs : outputs
        });

        var payload = executeRequest.createPostPayload();

        $("textarea#xml").val(payload);

        var test="g";
    }
		
    function testExecuteRequest_wps_1_0(){
        var inputGenerator = new InputGenerator();
        var literalInput = inputGenerator.createLiteralDataInput_wps_1_0_and_2_0("literalId", "myDataType",
                "myUOM", "myValue");
        var literalInput2 = inputGenerator.createLiteralDataInput_wps_1_0_and_2_0("literalId", null,
                null, "myValue");
        var complexInput = inputGenerator.createComplexDataInput_wps_1_0_and_2_0("complexId",
                "myMimeType", "mySchema", "MyEncoding", false, "<test><test2>hello</test2></test>");
        var bboxInput = inputGenerator.createBboxDataInput_wps_1_0_and_2_0("myBBOX", "EPSG:4326",
                "2", "0.0 0.0", "50.0 50.0");

        var referenceInput = inputGenerator.createComplexDataInput_wps_1_0_and_2_0("complexId",
                "myMimeType", "mySchema", null, true, "http://myReferenceUrl");

        var inputs = [literalInput, literalInput2, complexInput, bboxInput, referenceInput];

        //outputs
        var outputGenerator = new OutputGenerator();
        //var literalOutput = outputGenerator.createLiteralOutput_WPS_1_0("literalOutput");
        var complexOutput = outputGenerator.createComplexOutput_WPS_1_0("complexOutput", "myMimeType", 
                "mySchema", "myEncoding", "myUOM", true, "MyTitle", "MyAbstract");

        var outputs = [complexOutput];

        var executeRequest = new ExecuteRequest_v1({
            url : "testUrl",
            version : "1.0.0",
            processIdentifier : "myProcess",
            responseFormat : "raw",
            executionMode : "async",
            lineage : false,
            inputs : inputs,
            outputs : outputs
        });

        var payload = executeRequest.createPostPayload();

        $("textarea#xml").val(payload);

        var test="g";
    }