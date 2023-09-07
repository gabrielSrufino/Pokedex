let activeModal = null;

function openModal(pokemon) {
  closeModal();

  const modalContainer = document.getElementById("modals");
  const modal = document.createElement("div");
  modal.className = `modal ${pokemon.type} show`;

  const capitalizedPokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const statsInfo = pokemon.stats.map((stat) => {
    const { name, base_stat } = stat;
    return `${name}: ${base_stat}`;
  });

  modal.innerHTML = `
  <div class="modal-content" style="
  display: flex;
  flex-direction: column;
">
      <span class="close" id="closeModal">&times;</span>
      <img src="${pokemon.photo}" alt="${capitalizedPokemonName}">
      <div class="info">
        <h2 class="centered">${capitalizedPokemonName}</h2>
        <p><strong>Type:</strong> ${pokemon.type}</p>
        <p><strong>Id:</strong> ${pokemon.number}</p>
        <p><strong>Stats:</strong><br/>${statsInfo.join(' <br/> ')}</p>
        <br><br>
      </div>
    </div>
  `;
  modalContainer.appendChild(modal);

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  document.body.appendChild(modalOverlay);

  activeModal = modal;

  const closeModalButton = modal.querySelector("#closeModal");
  closeModalButton.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", closeModal);
}

function closeModal() {
  if (activeModal) {
    const modalContainer = document.getElementById("modals");
    const modalOverlay = document.querySelector(".modal-overlay");

    modalContainer.removeChild(activeModal);
    document.body.removeChild(modalOverlay);

    document.body.classList.remove("page-fade");

    activeModal = null;
  }
}
