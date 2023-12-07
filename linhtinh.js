<div className="component-item cancelFriendOption">
  <select
    name="cancelFriendOption"
    className="cancelFriendType"
    onChange={handleSelectChangeCancelFriend}
    value={selectedValueCancelFriend}
  >
    <option value="cancelRequest">Cancel friend requests</option>
    <option value="unfriend">Unfriend</option>
  </select>
  <img src={downButton} alt="Down Button" />
</div>;
