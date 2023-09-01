import PropTypes from "prop-types";

export default function changeModal({
  onClose,
  title,
  onPatch,
  isError,
  message,
}) {
  return (
    <div className="모달">
      <button className="닫기버튼" onClick={onClose}>
        X
      </button>
      <p className="변경사항_모달">{title}</p>
      <div className="변경">
        <input className="변경내용" />
        <button className="변경버튼_모달" onClick={onPatch}>
          변경
        </button>
      </div>
      <p className={isError ? "변경메세지T" : "변경메세지F"}>{message}</p>
    </div>
  );
}

changeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onPatch: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};
