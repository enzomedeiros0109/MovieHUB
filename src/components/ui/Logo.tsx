type Props = {}

const Logo = ({ }: Props) => {
  return (
    <img
      src="src/assets/logo.svg"
      className="hidden md:block size-10 shrink-0 transition-transform duration-500 ease-in-out hover:rotate-360"
    />
  )
}

export default Logo