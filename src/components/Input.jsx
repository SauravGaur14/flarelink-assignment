export default function Input({label, value, onChange}){
    return(
        <div className="text-3xl flex gap-4">
            <label htmlFor={label}>{label}</label>
            <input className="rounded-xl" value={value} type="text" onChange={onChange}/>
        </div>
    )
}