/* eslint-disable react/prop-types */


const Error = ({message}) => {
  return (
    <div>
        <p className="text-sm text-red-600">{message}</p>
    </div>
  )
}

export default Error