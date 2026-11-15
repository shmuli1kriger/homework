import './App.css'
export default function Address({ street, city, state, zip }) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>street</th>
                        <th>city</th>
                        <th>state</th>
                        <th>zip</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{street}</td>
                        <td>{city}</td>
                        <td>{state}</td>
                        <td>{zip}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}