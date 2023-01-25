export default function Header({ pageName }: { pageName: string }) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          CREDIT BOOK
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              {/* <a className="nav-link active" href="/"> */}
              <a
                className={`nav-link ${pageName === "home" && "active"}`}
                href="/"
              >
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link  ${pageName === "addcustomer" && "active"}`}
                href="/add-customer"
              >
                ADD CUSTOMER
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link  ${pageName === "moves" && "active"}`} href="/movements">
                MOVES
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link  ${pageName === "reports" && "active"}`} href="/reports">
                REPORTS
              </a>
            </li>
          </ul>

          <form role="search">
            <input
              style={{ display: "none" }}
              className="form-control"
              type="search"
              placeholder="Search"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}
