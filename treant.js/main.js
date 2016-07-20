var strVar = "";
strVar += "    <div class=\"row\">";
strVar += "        <div class=\"col s12 m6\">";
strVar += "            <div class=\"card blue-grey hoverable\">";
strVar += "                <div class=\"card-content white-text\">";
strVar += "                    <span class=\"card-title\">Card Title<\/span>";
strVar += "                    <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.<\/p>";
strVar += "                <\/div>";
strVar += "                <div class=\"card-action\">";
strVar += "                    <a href=\"#\">This is a link<\/a>";
strVar += "                    <a href=\"#\">This is a link<\/a>";
strVar += "                <\/div>";
strVar += "            <\/div>";
strVar += "        <\/div>";
strVar += "    <\/div>";

simple_chart_config = {
    chart: {
        container: "#tree-simple",
        scrollbar: "native",
        node: {
            collapsable: true,
            //            HTMLclass: "waves-effect waves-light btn"
        }
    },

    nodeStructure: {
        text: {
            name: "Parent node"
        },

        children: [
            {
                innerHTML: strVar

            },
            {
                innerHTML: strVar
            }
        ]
    }
};



var my_chart = new Treant(simple_chart_config);