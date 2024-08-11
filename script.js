(
	() => {
		const clickPaste
		= (event) => {
			window
			. navigator
			. clipboard
			. readText()
			. then(
				(text) => {
					window
					. document
					. querySelector("#swoope-code2html-text")
					. value 
					= text;
				}
			)
			. catch((error) => window . alert(window . String(error)));
		};
		const clickCopy
		= (event) => {
			window
			. navigator
			. clipboard
			. writeText(
				window
				. document
				. querySelector("#swoope-code2html-html")
				. value 
			)
			. catch((error) => window . alert(window . String(error)));
		};
		const clickConvert
		= (event) => {
			const tabSizeElement
			= window
			. document
			. querySelector("#swoope-code2html-option-tabsize");
			const digits
			= Array . from("0123456789");
			const tabSize
			= (
				tabSizeElement . value . length > 0
				&& Array 
				. from(tabSizeElement . value) 
				. every((d) => digits . includes(d))
				? window . Number(tabSizeElement . value)
				: 8
			);
			const textType
			= window
			. document
			. querySelector("#swoope-code2html-option-type")
			. value;
			const textArea
			= window
			. document
			. querySelector("#swoope-code2html-text");
			const specialCharacters
			= {
				["\n"] : "<br>"
				, [" "] : "&nbsp;"
				, ["\""] : "&quot;"
				, ["&"] : "&amp;"
				, ["\'"] : "&apo;"
				, ["<"] : "&lt;"
				, [">"] : "&gt;"
			};
			window
			. document
			. querySelector("#swoope-code2html-html")
			. value
			= "<pre>"
			+ "<" + textType + ">"
			+ window
			. Array
			. from(
				window
				. document
				. querySelector("#swoope-code2html-text")
				. value
			)
			. map(
				(x) => (
					x == "\r"
					? ""
					: x == "\t"
					? ("&nbsp;") . repeat(tabSize)
					: x in specialCharacters
					? specialCharacters[x]
					: x
				)
			)
			. filter((x) => x != "")
			. join("")
			+ "</" + textType + ">"
			+ "</pre>"
		};
		const clearText
		= () => {
			["text" , "html"]
			. forEach(
				(x) => {
					window
					. document
					. querySelector("#swoope-code2html-" + x)
					. value
					= "";
				}
			);
		};
		const startEvents
		= () => {
			[
				["paste" , clickPaste]
				, ["copy" , clickCopy]
				, ["convert" , clickConvert]
			]
			. forEach(
				(x) => {
					window
					. document
					. querySelector("#swoope-code2html-button-" + x[0])
					. addEventListener(
						"click"
						, x[1]
					);
				}
			);
		};
		clearText();
		startEvents();
	}
)();
