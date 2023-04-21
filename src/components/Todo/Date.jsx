function Date(props) {
  let display = '';
  if (props.dateStart === '') {
    display = 'No Date';
  } else if (props.dateEnd === '') {
    display = props.dateStart;
  } else {
    display = props.dateStart + ' - ' + props.dateEnd;
  }

  return (
    <div className="text-neutral-300 text-xs">
      {display}
    </div>
  );
}

export default Date;
