<?php
class securityValidation{
	
	public $errors = array();
	
	public function validate($data, $rules) {
		$valid = TRUE;

		foreach ($rules as $fieldname=>$rule) {
			$callbacks = explode("|",$rule);

			foreach ($callbacks as $callback) {
				$value = isset($data[$fieldname]) ? $data[$fieldname]:NULL;
				if ($this->$callback($value, $fieldname) == FALSE) {
					$valid = FALSE;
				}
			}
		}

		return $valid;
	}

	public function email($value, $fieldname) {
		$valid = filter_var($value, FILTER_VALIDATE_EMAIL);
		if ($valid == FALSE) {
			$this->errors[] = "The {$fieldname} needs to be a valid email";
		}

		return $valid;
	}

	public function required($value, $fieldname) {
		$valid = !empty($value);
		if ($valid == FALSE) {
			$this->errors[] = "The {$fieldname} is required";
		}

		return $valid;
	}
};