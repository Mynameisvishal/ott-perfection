import React,{useState,useEffect} from 'react'
import { Button, Icon, Checkbox } from "semantic-ui-react";
import "./Filter.css";

function Filter({ show,setActionB,setComedyB,setCrimeB,setRomanticB,setEnglish,setHindi  }) {
    const [showFilter, SetShowFilter] = useState(false);
    const [action, setAction] = useState(true);
    const [comedy, setComedy] = useState(true);
    const [crime, setCrime] = useState(true);
    const [romantic, setRomantic] = useState(true);
    const [english, setEng] = useState(false);
    const [hindi, setHind] = useState(false);

    useEffect(() => {
        setActionB(action);
    }, [action]);
    useEffect(() => {
        setComedyB(comedy);
    }, [comedy]);
    useEffect(() => {
        setCrimeB(crime);
    }, [crime]);
    useEffect(() => {
        setRomanticB(romantic);
    }, [romantic]);
    useEffect(() => {
        setEnglish(english)
    },[english])
    useEffect(() => {
        setHindi(hindi)
    },[hindi])

    return (
        <div >
            <Button onClick={() => { SetShowFilter(!showFilter) }} className={` filter__grey ${show &&"filter__red"}`}>
                <Icon name="filter" /> Filter
            </Button>
            <div className={`filter__downview ${showFilter && 'filter__display'}`}>
                <h3>Genre</h3>
                <Checkbox className="filter__checkbox" checked={action}
                    onChange={() => { setAction(!action); }}
                    label='Action' />
                <Checkbox className="filter__checkbox" checked={comedy}
                    onChange={() => { setComedy(!comedy); }}
                    label='Comedy' />
                <Checkbox className="filter__checkbox" checked={crime}
                    onChange={() => { setCrime(!crime); }}
                    label='Crime' />
                <Checkbox className="filter__checkbox" checked={romantic}
                    onChange={() => { setRomantic(!romantic);}}
                    label='Romantic' />
                <h3>Languages</h3>
                <Checkbox className="filter__checkbox" checked={english}
                    onChange={() => { setEng(!english); }}
                    label='English' />
                <Checkbox className="filter__checkbox" checked={hindi}
                    onChange={() => { setHind(!hindi); }}
                    label='Hindi' />
            </div>
          
        </div>
    );
}

export default Filter
