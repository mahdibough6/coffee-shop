      const Keyboard = ()
      <div classname="flex flex-col flex-1">
        <br />
        <div classname="grid grid-cols-3 ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button
              key={number}
              onclick={() => handlenumberclick(number)}
              classname="mb-number-btn"
            >
              {number}
            </button>
          ))}
          <button onclick={handleclear}>clear</button>
          <button
            onclick={() => handlenumberclick(0)}
            classname="mb-number-btn"
          >
            0
          </button>
          <button onclick={handleremove}>remove</button>
        </div>
      </div>