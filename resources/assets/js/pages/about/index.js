/**
 * Created by Rajesh on 11/26/18.
 */


import React, {Component} from 'react';
import Districts from "../../maps/district";
import Upazilas from "../../maps/upazilas-raw";
import { withStyles } from '@material-ui/styles';
import posed from 'react-pose';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    gridMargin: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
});

const svgStarter = '<svg enable-background="new -106.403 -201.859 629.266 880.536" height="880.536px" id="district_41" viewBox="-106.403 -201.859 629.266 880.536" width="629.266px" x="0px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" y="0px"></svg>';

const SVG = posed.svg({});

const G = posed.g({});

const pathProperty = {
    hoverable: true,
    init: {
        fill: "rgba(0,0,0,0)",
    },
    hover: {
        fill: "#c62828",
    }
};

const Path = posed.path(pathProperty);
const Polygon = posed.polygon(pathProperty);

const selectedPathProperty = {
    hoverable: true,
    init: {
        fill: "#74c653",
    },
    hover: {
        fill: "#c62828",
    }
};

const SelectedPath = posed.path(selectedPathProperty);
const SelectedPolygon = posed.polygon(selectedPathProperty);

const distPathProperty = {
    hoverable: false,
    init: {
        fill: "rgba(0,0,0,0)",
        strokeWidth: 2
    }
};

const DistrictPath = posed.path(distPathProperty);
const DistrictPolygon = posed.polygon(distPathProperty);

function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });

}

function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function saveTextAsFile() {
    let textToWrite = document.getElementById('generated-output').value;
    let textFileAsBlob = new Blob([ textToWrite ], { type: 'text/plain' });
    let fileNameToSaveAs = "new.svg";

    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        // Firefox requires the link to be added to the DOM before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function destroyClickedElement(event) {
    // remove the link from the DOM
    document.body.removeChild(event.target);
}

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            selectedVal: '',
            selectedIndex: null,
            areaName: '',
            bengaliName: '',
            areaType: '',
            areaParent: '',
            output: ''
        };

        this.onLocationClick = this.onLocationClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearOutput = this.clearOutput.bind(this);
    }

    componentDidMount(){
        this.setState({
            output: svgStarter
        });
    }

    onLocationClick(e, index){

        this.setState({
            selectedIndex: index,
            selectedVal: e.target.outerHTML
        });
    }

    handleChange(event, name){
        this.setState({
            ...this.state,
            [name]: event.target.value
        });
    }

    clearOutput(){
        this.setState({
            selected: [],
            selectedVal: '',
            selectedIndex: null,
            areaName: '',
            bengaliName: '',
            areaType: '',
            areaParent: '',
            output: svgStarter
        });
    }

    handleSubmit(e){
        const {selected, selectedVal, selectedIndex, output, areaName, bengaliName, areaType, areaParent} = this.state;

        e.preventDefault();

        if(selectedVal !== '') {
            let tempSelected = selected;
            if (tempSelected.includes(selectedIndex))
                tempSelected = arrayRemove(tempSelected, selectedIndex);
            else
                tempSelected.push(selectedIndex);

            let svg = htmlToElement(output);
            let targetElem = htmlToElement(selectedVal);

            targetElem.setAttribute('area', areaType);
            targetElem.setAttribute('name', areaName);
            targetElem.setAttribute('bengali', bengaliName);
            targetElem.setAttribute('parent', areaParent);
            targetElem.removeAttribute('fill');
            targetElem.removeAttribute('style');

            svg.appendChild(targetElem);

            this.setState({
                selected: tempSelected,
                output: svg.outerHTML,
                selectedVal: '',
                selectedIndex: null,
                areaName: '',
                bengaliName: '',
            });
        }
    }

    renderSingleItem(item, idx, key='div_'){
        if(item.type == 'polygon'){
            return(
                <Polygon
                    key={key + idx}
                    points={item.path}
                    id={key + idx}
                    onClick={(e) => this.onLocationClick(e,idx)}
                    style={{
                        cursor: 'pointer',
                    }}
                />
            );
        }

        return(
            <Path
                key={key + idx}
                d={item.path}
                id={key + idx}
                onClick={(e) => this.onLocationClick(e,idx)}
                style={{
                    cursor: 'pointer',
                }}
            />
        )
    }

    renderSelectedSingleItem(item, idx, key="selected_upa_"){
        if(item.type == 'polygon'){
            return(
                <SelectedPolygon
                    key={key + idx}
                    points={item.path}
                    id={key + idx}
                    style={{
                        cursor: 'pointer',
                    }}
                />
            );
        }

        return(
            <SelectedPath
                key={key + idx}
                d={item.path}
                id={key + idx}
                style={{
                    cursor: 'pointer',
                }}
            />
        );
    }

    render(){
        const {selected, selectedVal, areaName, bengaliName, areaType, areaParent, output} = this.state;
        const classes = this.props.classes;

        const mapObject = Upazilas;

        const upazilas = mapObject.locations.map((div, idx) => {
            if(selected.includes(idx)){
                return this.renderSelectedSingleItem(div, idx);
            }else {
                return this.renderSingleItem(div, idx, 'upazila_');
            }
        });

        const districts = Districts.locations.map((dis, idx) => {
            if(dis.type == 'polygon'){
                return(
                    <DistrictPolygon
                        key={"district_" + idx}
                        points={dis.path}
                        id={"district_" + idx}
                    />
                );
            }

            return(
                <DistrictPath
                    key={'district_' + idx}
                    d={dis.path}
                    id={'district_' + idx}
                />
            );
        });

        const viewBox = mapObject.viewBox ? mapObject.viewBox : `0 0 ${mapObject.width} ${mapObject.height}`;

        return(
            <Container fixed>
                <h1 className="light center-aligned">
                    About Us
                </h1>
                <h4 className="center-aligned">
                    Let Us Introduce Ourselves
                </h4>
                <Grid container spacing={2} className={classes.gridMargin}>
                    <Grid item xs={8}>
                        <div style={{width: '100%', overflow: 'hidden'}}>
                            <SVG
                                id="svg7651"
                                height="950px"
                                width="100%"
                                viewBox={viewBox}
                            >
                                <G id="upazilas" stroke="#000000">
                                    {districts}
                                </G>
                                <G id="upazilas" stroke="#8BC34A">
                                    {upazilas}
                                </G>
                            </SVG>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                    <TextField
                                        id="outlined-name"
                                        label="Name"
                                        value={areaName}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e, 'areaName')}
                                        fullWidth
                                    />

                                    <TextField
                                        id="outlined-area-bengali"
                                        label="Bengali Name"
                                        value={bengaliName}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e, 'bengaliName')}
                                        fullWidth
                                    />

                                    <Select
                                        value={areaType}
                                        onChange={(e) => this.handleChange(e, 'areaType')}
                                        input={<OutlinedInput name="outlined-area-type" id="outlined-area-type" fullWidth/>}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value='upazlia'>Upazila</MenuItem>
                                        <MenuItem value='district'>District</MenuItem>
                                        <MenuItem value='division'>Division</MenuItem>
                                    </Select>


                                    <TextField
                                        id="outlined-area-parent"
                                        label="Parent"
                                        value={areaParent}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e, 'areaParent')}
                                        fullWidth
                                    />

                                    <TextField
                                        id="selected-path"
                                        label="Selected Value"
                                        placeholder="Select From SVG"
                                        value={selectedVal}
                                        multiline
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        rows="15"
                                    />
                                    <Button variant="contained" color="primary" type="submit" disabled={areaName === '' || areaType === '' || areaParent === ''}>
                                        Add to file
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Card className={classes.gridMargin}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="generated-output"
                                    label="Generated ouput"
                                    placeholder="Generated Output"
                                    value={output}
                                    multiline
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    rows="15"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" color="primary" onClick={saveTextAsFile} fullWidth>Save File</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" color="secondary" onClick={this.clearOutput} fullWidth>Clear</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}

export default withStyles(styles)(About);
