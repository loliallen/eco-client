import React, { useEffect } from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import { useInput } from '../../hooks/useInput';
import TextFieldPlace from '../TextFieldPlace';
import { CSSTransition } from "react-transition-group"
import "./style.module.css"

const Map = ({ coords, setCoords }) => {
    const center = useInput()

    const handleEndDrag = (coord, _index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        setCoords({lat, lng})
    }

    useEffect(() => {
        if (coords)
            center.setValue(coords)
    }, [coords])
    return (
        <>
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 55.830433, lng: 49.066082 }}
                center={center.value ? center.value : null}
            >
                {coords && (
                    <Marker
                        position={coords}
                        draggable={true}
                        onDragEnd={handleEndDrag}
                    />
                )}
            </GoogleMap>
        </>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default ({ coords, setCoords, setAddr }) => <div style={{ height: "300px", width: "500px",paddingBottom: "10%" }}>
    <TextFieldPlace coords={coords} setAddr={setAddr} setCoords={setCoords} fullWidth style={{ marginBottom: "1rem" }} />
    <CSSTransition
        in={!!coords}
        timeout={500}
        classNames="map"
    >
        <div style={{ height: "300px", width: "500px" }}>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDvMJHc6z8X0finyFVX1gMHfzG8hxKeOAY`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                coords={coords}
                setCoords={setCoords}
            />
        </div>
    </CSSTransition>
</div >