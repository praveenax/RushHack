const {
    google
} = require('googleapis');

class render {
    createCircle(auth,size) {

        var pageId = 'p';
        var presentationId = '19It0lvWa0124NEueiLs4VsmCFnctAzMCdxSyMFHbaE4';
        
        const slides = google.slides({
            version: 'v1',
            auth
        });
        //build a object for circle and add to the current page
        console.log('Circle called');
        
        var d = new Date();

        let elementId = 'MyTextBox_01_'+d.getTime();
        let pt350 = {
            magnitude: size,
            unit: 'PT',
        };
        let requests = [{
                createShape: {
                    objectId: elementId,
                    shapeType: 'ELLIPSE',
                    elementProperties: {
                        pageObjectId: pageId,
                        size: {
                            height: pt350,
                            width: pt350,
                        },
                        transform: {
                            scaleX: 1,
                            scaleY: 1,
                            translateX: 350,
                            translateY: 100,
                            unit: 'PT',
                        },
                    },
                },
},
// Insert text into the box, using the supplied element ID.
            {
                insertText: {
                    objectId: elementId,
                    insertionIndex: 0,
                    text: 'New Box Text Inserted!',
                },
}];
        // Execute the request.
        slides.presentations.batchUpdate({
            presentationId,
            resource: {
                requests
            },
        }, (err, createTextboxWithTextResponse) => {
//            let createShapeResponse = createTextboxWithTextResponse.replies[0].createShape;
            console.log(`Created textbox with ID: `);
        });

    }
}


module.exports = render;
