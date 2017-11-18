@echo off

set TAGDIR=%~dp0..\

set BIN=%TAGDIR%\bin
set CMD=%TAGDIR%\cmd
set LIB=%TAGDIR%\lib
set TAGOPT=%LIB%\portuguese-utf8.par -token -lemma -sgml -quiet

if "%2"=="" goto label1
perl %CMD%\utf8-tokenize.perl -a %LIB%\portuguese-abbreviations "%~1" | %BIN%\tree-tagger %TAGOPT% > "%~2"
goto end

:label1
if "%1"=="" goto label2
perl %CMD%\utf8-tokenize.perl -a %LIB%\portuguese-abbreviations "%~1" | %BIN%\tree-tagger %TAGOPT% 
goto end

:label2
echo.
echo Usage: tag-portuguese file {file}
echo.

:end
