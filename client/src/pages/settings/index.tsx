import Header from "../../components/Header"
import Loading from "../../components/Loading"
import Scrollable from "../../components/Scrollable"

function Settings() {
  return (
    <>
      <Header title="Settings" />
      <Loading>
        <Scrollable>
          <div className="h-96 w-full mb-6 rounded-md p-4 bg-dark-light shadow">
            <p>Status</p>
          </div>
          <div className="h-96 w-full mb-6 rounded-md p-4 bg-dark-light shadow">
            <p>Tags</p>
          </div>
          <div className="h-96 w-full mb-6 rounded-md p-4 bg-dark-light shadow">
            <p>Activity Types</p>
          </div>
        </Scrollable>
      </Loading>
    </>
  )
}

export default Settings