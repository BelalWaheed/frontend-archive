import React from "react";

const Nav = ({ products, addP }) => {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-none">
          <a className="btn btn-ghost text-xl">Cart</a>
        </div>

        <div className="flex-1 flex justify-center gap-4 mx-4">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => addP("shipcy")}
          >
            shipcy
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => addP("pesi")}
          >
            pesi
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => addP("molto")}
          >
            molto
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => addP("kranshy")}
          >
            kranshy
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => addP("cigaretes")}
          >
            cigaretes
          </button>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {products.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
