const closeDropdown = (dropdown) => {
  const trigger = dropdown.querySelector(".sumi-dropdown__trigger");
  const menu = dropdown.querySelector(".sumi-dropdown__menu");
  if (!trigger || !menu) return;
  trigger.setAttribute("aria-expanded", "false");
  menu.hidden = true;
};

document.querySelectorAll(".sumi-graph-cell--live [data-dropdown]").forEach((dropdown) => {
  const trigger = dropdown.querySelector(".sumi-dropdown__trigger");
  const menu = dropdown.querySelector(".sumi-dropdown__menu");
  const value = dropdown.querySelector("[data-dropdown-value]");
  const options = [...dropdown.querySelectorAll('[role="option"]')];
  if (!trigger || !menu) return;

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
    if (!open) options[0]?.focus();
  });

  options.forEach((option) => option.addEventListener("click", () => {
    const selectedLabel = dropdown.dataset.selectedLabel || "SELECTED";
    options.forEach((candidate) => {
      const selected = candidate === option;
      candidate.setAttribute("aria-selected", String(selected));
      const state = candidate.querySelector(".sumi-dropdown__state");
      if (state) state.textContent = selected ? selectedLabel : "";
    });
    if (value) value.textContent = option.dataset.value;
    closeDropdown(dropdown);
    trigger.focus();
  }));

  dropdown.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdown(dropdown);
      trigger.focus();
    }
    if (event.key === "ArrowDown" && document.activeElement === trigger) {
      event.preventDefault();
      trigger.setAttribute("aria-expanded", "true");
      menu.hidden = false;
      options[0]?.focus();
    }
  });
});

document.addEventListener("click", (event) => {
  document.querySelectorAll(".sumi-graph-cell--live [data-dropdown]").forEach((dropdown) => {
    if (!dropdown.contains(event.target)) closeDropdown(dropdown);
  });
});

document.querySelectorAll(".sumi-graph-cell--live [data-graph-segmented]").forEach((control) => {
  const options = [...control.querySelectorAll(".sumi-segmented__option")];
  options.forEach((option) => option.addEventListener("click", () => {
    options.forEach((candidate) => {
      const selected = candidate === option;
      candidate.classList.toggle("is-selected", selected);
      candidate.setAttribute("aria-selected", String(selected));
    });
  }));
});

document.querySelectorAll(".sumi-graph-cell--live [data-graph-toggle]").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const pressed = toggle.getAttribute("aria-pressed") === "true";
    toggle.setAttribute("aria-pressed", String(!pressed));
    toggle.classList.toggle("is-selected", !pressed);
  });
});

document.querySelectorAll(".sumi-graph-cell--live [data-graph-tabs]").forEach((tabs) => {
  const buttons = [...tabs.querySelectorAll(".sumi-tabs__tab")];
  buttons.forEach((button) => button.addEventListener("click", () => {
    buttons.forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle("is-selected", selected);
      candidate.setAttribute("aria-selected", String(selected));
    });
  }));
});

document.querySelectorAll(".sumi-graph-cell--live [data-graph-loading]").forEach((button) => {
  const original = button.innerHTML;
  button.addEventListener("click", () => {
    if (button.classList.contains("is-loading")) {
      button.classList.remove("is-loading");
      button.innerHTML = original;
      return;
    }
    button.classList.add("is-loading");
    button.innerHTML = `${original} <span class="sumi-state">LOADING</span>`;
  });
});

document.querySelectorAll(".sumi-graph-cell--live [data-graph-field], .sumi-graph-cell--live [data-graph-date]").forEach((input) => {
  const field = input.closest(".sumi-field");
  if (!field) return;
  const ensureMessage = () => {
    let message = field.querySelector(".sumi-field__message");
    if (!message) {
      message = document.createElement("p");
      message.className = "sumi-field__message";
      field.append(message);
    }
    return message;
  };
  input.addEventListener("focus", () => field.classList.add("is-focus"));
  input.addEventListener("blur", () => field.classList.remove("is-focus"));
  if (input.hasAttribute("data-graph-date")) {
    input.addEventListener("input", () => {
      const valid = /^\d{4}-\d{2}-\d{2}$/.test(input.value);
      field.classList.toggle("is-error", !valid);
      const message = ensureMessage();
      message.textContent = valid ? "" : "Use YYYY-MM-DD.";
      message.hidden = valid;
    });
  }
});

const bindExclusiveRows = (root, itemSelector, selectedClass, currentAttr) => {
  const items = [...root.querySelectorAll(itemSelector)];
  items.forEach((item) => item.addEventListener("click", () => {
    items.forEach((candidate) => {
      const selected = candidate === item;
      candidate.classList.toggle(selectedClass, selected);
      if (currentAttr) {
        if (selected) candidate.setAttribute(currentAttr, "page");
        else candidate.removeAttribute(currentAttr);
      }
      const state = candidate.querySelector(".sumi-state");
      if (state) state.textContent = selected ? "CURRENT" : "";
    });
  }));
};

document.querySelectorAll(".sumi-graph-cell--live [data-graph-index]").forEach((root) => {
  bindExclusiveRows(root, ".sumi-index__item", "is-selected", "aria-current");
});

document.querySelectorAll(".sumi-graph-cell--live [data-graph-shell]").forEach((root) => {
  bindExclusiveRows(root, ".sumi-index__item", "is-selected", "aria-current");
});

document.querySelectorAll(".sumi-graph-cell--live [data-graph-dialog]").forEach((dialog) => {
  const body = dialog.querySelector(".sumi-dialog__body");
  const original = body ? body.textContent : "";
  dialog.querySelector("[data-graph-dialog-cancel]")?.addEventListener("click", () => {
    if (body) body.textContent = original;
  });
  dialog.querySelector("[data-graph-dialog-confirm]")?.addEventListener("click", () => {
    if (body) body.textContent = "Delete is waiting for confirmation from the source.";
  });
});

document.querySelectorAll(".sumi-graph-cell--live [data-graph-slip]").forEach((slip) => {
  const title = slip.querySelector(".sumi-slip__title");
  const original = title ? title.textContent : "";
  slip.querySelector("[data-graph-slip-open]")?.addEventListener("click", () => {
    if (!title) return;
    title.textContent = title.textContent === "Opened" ? original : "Opened";
  });
});

document.querySelectorAll(".sumi-graph-cell--live [data-graph-status]").forEach((stamp) => {
  const cycle = [
    { className: "sumi-status sumi-status--waiting", label: "Waiting" },
    { className: "sumi-status sumi-status--attention", label: "Needs review" },
    { className: "sumi-status sumi-status--healthy", label: "Healthy" }
  ];
  let index = 0;
  stamp.addEventListener("click", () => {
    index = (index + 1) % cycle.length;
    stamp.className = cycle[index].className;
    stamp.textContent = cycle[index].label;
  });
});

document.querySelectorAll(".sumi-graph-cell--live [data-graph-toast]").forEach((toast) => {
  const kicker = toast.querySelector(".sumi-kicker");
  const copy = toast.querySelector("p:not(.sumi-kicker)");
  toast.querySelector("[data-graph-toast-retry]")?.addEventListener("click", () => {
    toast.classList.remove("sumi-toast--error");
    if (kicker) kicker.textContent = "Checking";
    if (copy) copy.textContent = "Waiting for the source to confirm the write.";
    window.setTimeout(() => {
      toast.classList.add("sumi-toast--error");
      if (kicker) kicker.textContent = "Failed";
      if (copy) copy.textContent = "Save did not complete. Retry the write.";
    }, 700);
  });
});

document.querySelectorAll(".sumi-graph-cell--live [data-graph-empty]").forEach((surface) => {
  const kicker = surface.querySelector(".sumi-kicker");
  const heading = surface.querySelector("h3");
  const copy = surface.querySelector("p:not(.sumi-kicker)");
  surface.querySelector("[data-graph-empty-retry]")?.addEventListener("click", () => {
    surface.classList.remove("sumi-state-surface--error");
    if (kicker) kicker.textContent = "Loading";
    if (heading) heading.textContent = "Checking ledger source";
    if (copy) copy.textContent = "Waiting for the source to confirm current rows.";
    window.setTimeout(() => {
      surface.classList.add("sumi-state-surface--error");
      if (kicker) kicker.textContent = "Error";
      if (heading) heading.textContent = "Ledger source unavailable";
      if (copy) copy.textContent = "The source did not confirm. Retry the load.";
    }, 700);
  });
});

document.querySelectorAll(".sumi-graph-cell--live [data-graph-ledger]").forEach((table) => {
  const rows = [...table.querySelectorAll("[data-graph-row]")];
  rows.forEach((row) => row.addEventListener("click", () => {
    rows.forEach((candidate) => {
      const selected = candidate === row;
      candidate.classList.toggle("is-selected", selected);
      candidate.setAttribute("aria-selected", String(selected));
      let state = candidate.querySelector(".sumi-ledger-current");
      if (selected) {
        if (!state) {
          state = document.createElement("span");
          state.className = "sumi-state sumi-ledger-current";
          candidate.cells[0]?.append(" ", state);
        }
        state.textContent = "CURRENT";
      } else if (state) {
        state.remove();
      }
    });
  }));
});
