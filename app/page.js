'use client'
export default function Page() {
  const fet = async () => {
    const res = await fetch('https://api.openai.com/')
    const data = await res
    console.log(data, res)
    return data
  }
  return (
    <div className="">
      <button onClick={fet}>vl</button>
    </div>
  )
}