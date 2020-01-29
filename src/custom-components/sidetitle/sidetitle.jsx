import React from "react";

const SideTitle = ({
  title,
  onClickAddPlayList,
  showAddPlayListButton,
  messageButton
}) => {
  const handleClickButton = () => {
    onClickAddPlayList();
  };

  return (
    <section className="panel-inf">
      <section className="panel-inf__main-section">
        <section className="panel-inf__main-section__img-section">
          {showAddPlayListButton && (
            <button onClick={handleClickButton}>{messageButton}</button>
          )}
        </section>
        <section className="panel-inf__main-section__name-section">
          <h1>{title}</h1>
        </section>
      </section>
    </section>
  );
};

export default SideTitle;
