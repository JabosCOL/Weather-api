import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css"
import Alert from "../alert/Alert";
import { Country, SearchState } from "../../types";

type FormProps = {
    fetchWeather: (search: SearchState) => Promise<void>
}

export default function Form({fetchWeather} : FormProps) {

    const [ search, setSearch ] = useState<SearchState>({
        city: '',
        country: ''
    })
    const[ alert, setAlert ] = useState('')



    const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()

        // Empty fields validation
        if (Object.values(search).includes('')) {
            setAlert('All fields must be filled')
            return
        }

        // Bogota regex to Cundinamarca validation
        const pattern = /^(bogot[aá]|Bogot[aá])\s?(d\.?c\.?|D\.?C\.?|dc|DC)?$/i;
        if (search.city.match(pattern)) {
            fetchWeather({...search, city: 'cundinamarca'})
            setAlert('')
            setSearch({
                ...search,
                city: '',
            })
            return
        }

        fetchWeather(search)
        setAlert('')
        setSearch({
            ...search,
            city: '',
        })
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >

            {alert && <Alert>{alert}</Alert>}

            <div className={styles.field}>
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={search.city}
                    onChange={onChangeHandler}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">Country:</label>
                <select
                    name="country"
                    id="country"
                    value={search.country}
                    onChange={onChangeHandler}
                >
                    <option value="">Select a country</option>
                    {countries.map((country:Country) => (
                        <option
                            key={country.code}
                            value={country.code}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input
                className={styles.submit}
                type="submit"
                value="Check Weather"
            />
        </form>
    )
}
